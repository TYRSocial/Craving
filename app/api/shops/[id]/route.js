import { connectDB } from '@/lib/mongodb';
import Shop from '@/models/Shop';
import { extractToken, verifyToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
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

    const shop = await Shop.findById(id);
    if (!shop) {
      return NextResponse.json(
        { error: 'Shop not found' },
        { status: 404 }
      );
    }

    if (shop.ownerId.toString() !== decoded.userId) {
      return NextResponse.json(
        { error: 'Not authorized to update this shop' },
        { status: 403 }
      );
    }

    const { foodItems } = await req.json();
    shop.foodItems = foodItems || [];
    await shop.save();

    return NextResponse.json({ shop });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
