import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
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

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    const alreadyLiked = post.likes.find(
      (like) => like.userId.toString() === decoded.userId
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like.userId.toString() !== decoded.userId
      );
      post.likeCount = Math.max(0, post.likeCount - 1);
    } else {
      post.likes.push({
        userId: decoded.userId,
        likedAt: new Date(),
      });
      post.likeCount += 1;
    }

    await post.save();

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
