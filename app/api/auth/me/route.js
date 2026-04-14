import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { extractToken, verifyToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const token = extractToken(req);

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
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

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        isShopOwner: user.isShopOwner,
        myCravings: user.myCravings,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
