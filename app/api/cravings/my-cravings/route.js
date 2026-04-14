import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { extractToken, verifyToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';
import { CRAVINGS } from '@/lib/constants';

export async function GET(req) {
  try {
    await connectDB();
    const token = extractToken(req);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized', myCravings: [] },
        { status: 200 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token', myCravings: [] },
        { status: 200 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found', myCravings: [] },
        { status: 200 }
      );
    }

    return NextResponse.json({ myCravings: user.myCravings || [] });
  } catch (error) {
    console.error('GET /api/cravings/my-cravings error:', error);
    return NextResponse.json({ myCravings: [], error: error.message }, { status: 200 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const token = extractToken(req);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { cravingId } = await req.json();
    if (!cravingId) {
      return NextResponse.json(
        { error: 'Craving ID is required' },
        { status: 400 }
      );
    }

    const craving = CRAVINGS.find((c) => c.id === cravingId);
    if (!craving) {
      return NextResponse.json(
        { error: 'Invalid craving ID' },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const alreadyExists = user.myCravings.find(
      (c) => c.cravingId === cravingId
    );
    if (alreadyExists) {
      return NextResponse.json(
        { message: 'Craving already saved' },
        { status: 200 }
      );
    }

    user.myCravings.push({
      cravingId,
      cravingName: craving.name,
      addedAt: new Date(),
    });

    await user.save();

    return NextResponse.json({ myCravings: user.myCravings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const token = extractToken(req);

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { cravingId } = await req.json();
    if (!cravingId) {
      return NextResponse.json(
        { error: 'Craving ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    user.myCravings = user.myCravings.filter(
      (c) => c.cravingId !== cravingId
    );
    await user.save();

    return NextResponse.json({ myCravings: user.myCravings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
