import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { extractToken, verifyToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await connectDB();
    const posts = await Post.find({ visibility: 'public' })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate('userId', 'name avatar email');

    return NextResponse.json({ posts });
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

    const { title, description, imageUrl, cravingCategory, visibility } =
      await req.json();

    if (!title || !imageUrl || !cravingCategory) {
      return NextResponse.json(
        { error: 'Please provide required fields' },
        { status: 400 }
      );
    }

    const post = await Post.create({
      userId: decoded.userId,
      title,
      description,
      imageUrl,
      cravingCategory,
      visibility: visibility || 'public',
    });

    await post.populate('userId', 'name avatar email');

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
