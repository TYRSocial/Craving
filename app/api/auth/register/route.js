import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, isShopOwner } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide all required fields' },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    user = await User.create({
      name,
      email,
      password,
      isShopOwner: isShopOwner || false,
    });

    const token = generateToken(user._id);

    return NextResponse.json(
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isShopOwner: user.isShopOwner,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
