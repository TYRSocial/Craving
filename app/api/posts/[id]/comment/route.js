import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import User from '@/models/User';
import { extractToken, verifyToken } from '@/lib/jwt';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
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

    const { text } = await req.json();
    if (!text) {
      return NextResponse.json(
        { error: 'Comment text is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    post.comments.push({
      userId: decoded.userId,
      userName: user.name,
      userAvatar: user.avatar || '',
      text,
      createdAt: new Date(),
    });
    post.commentCount += 1;

    await post.save();

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
