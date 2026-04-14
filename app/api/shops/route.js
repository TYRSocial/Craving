import { connectDB } from '@/lib/mongodb';
import Shop from '@/models/Shop';
import { extractToken, verifyToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const shops = await Shop.find().limit(50).populate('ownerId', 'name email');

    return NextResponse.json({ shops });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
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

    const {
      shopName,
      description,
      address,
      phone,
      email,
      foodItems,
    } = await req.json();

    if (!shopName || !address) {
      return NextResponse.json(
        { error: 'Please provide shop name and address' },
        { status: 400 }
      );
    }

    const shop = await Shop.create({
      ownerId: decoded.userId,
      shopName,
      description,
      address,
      phone,
      email,
      foodItems: foodItems || [],
    });

    await shop.populate('ownerId', 'name email');

    return NextResponse.json({ shop }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
