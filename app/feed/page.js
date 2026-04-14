'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MOOD_RECOMMENDATIONS } from '@/lib/constants';
import Link from 'next/link';

export default function FeedPage() {
  const { token, user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [loading, token, router]);

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      const postsData = data.posts || [];
      setPosts(postsData);
      
      // Track which posts user has liked
      const liked = new Set();
      postsData.forEach((post) => {
        if (post.likes?.some((l) => l.userId === user?.id)) {
          liked.add(post._id);
        }
      });
      setLikedPosts(liked);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const toggleLike = async (postId) => {
    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      setPosts(posts.map((p) => (p._id === postId ? data.post : p)));
      
      // Update liked posts
      const newLiked = new Set(likedPosts);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      setLikedPosts(newLiked);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const addComment = async (postId, text) => {
    if (!text.trim()) return;

    try {
      const res = await fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();

      setPosts(posts.map((p) => (p._id === postId ? data.post : p)));
      setComments({ ...comments, [postId]: '' });
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (loading || !token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header with Create Post Button */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Feed
          </h1>
          <Link
            href="/create-post"
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105"
          >
            <span>✚</span> Share
          </Link>
        </div>

        {/* Posts Feed */}
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-4">📭</div>
            <p className="text-xl text-gray-400 mb-4">No posts yet</p>
            <Link
              href="/create-post"
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Be the first to share →
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => {
              const moodData = post.mood ? MOOD_RECOMMENDATIONS[post.mood] : null;
              const isLiked = likedPosts.has(post._id);

              return (
                <article
                  key={post._id}
                  className="bg-gradient-to-b from-slate-800 to-slate-700 rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/50 transition group"
                >
                  {/* Post Header */}
                  <div className="p-4 sm:p-6 border-b border-purple-500/20">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center font-bold text-lg text-white">
                            {post.userId?.name?.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        
                        {/* User Info */}
                        <div>
                          <h3 className="font-bold text-white text-lg">
                            {post.userId?.name || 'Anonymous'}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Mood Badge */}
                      {moodData && (
                        <div className={`${moodData.color} px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2`}>
                          <span>{moodData.emoji}</span>
                          <span className="capitalize">{post.mood}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Post Image */}
                  <div className="relative overflow-hidden bg-black/50 aspect-square sm:aspect-auto sm:h-96">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                      }}
                    />
                  </div>

                  {/* Post Content */}
                  <div className="p-4 sm:p-6 space-y-4">
                    {/* Title and Description */}
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                      {post.description && (
                        <p className="text-gray-300 leading-relaxed">{post.description}</p>
                      )}
                      <div className="mt-3 inline-block px-4 py-2 bg-slate-700/50 rounded-full text-sm font-semibold text-purple-300">
                        {post.cravingCategory}
                      </div>
                    </div>

                    {/* Mood Recommendations */}
                    {moodData && (
                      <div className={`${moodData.color} p-4 rounded-xl`}>
                        <p className="font-bold text-sm mb-2">Based on your {post.mood} mood:</p>
                        <p className="text-sm font-semibold text-gray-700">
                          Try: {moodData.recommendations.slice(0, 3).join(' • ')}
                        </p>
                      </div>
                    )}

                    {/* Engagement Stats */}
                    <div className="flex gap-6 py-3 border-t border-b border-purple-500/20">
                      <button
                        onClick={() => toggleLike(post._id)}
                        className={`flex items-center gap-2 font-semibold transition transform hover:scale-110 ${
                          isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'
                        }`}
                      >
                        <span className="text-2xl">{isLiked ? '❤️' : '🤍'}</span>
                        <span>{post.likeCount || 0}</span>
                      </button>
                      <div className="flex items-center gap-2 font-semibold text-gray-400">
                        <span className="text-2xl">💬</span>
                        <span>{post.commentCount || 0}</span>
                      </div>
                    </div>

                    {/* Comments Section */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        <p className="font-semibold text-white text-sm">Comments</p>
                        {post.comments.map((comment, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-700/50 rounded-lg p-3 border border-purple-500/10"
                          >
                            <p className="font-semibold text-purple-300 text-sm">
                              {comment.userName}
                            </p>
                            <p className="text-gray-200 text-sm mt-1">{comment.text}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(comment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Comment Input */}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={comments[post._id] || ''}
                        onChange={(e) =>
                          setComments({
                            ...comments,
                            [post._id]: e.target.value,
                          })
                        }
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addComment(post._id, comments[post._id]);
                          }
                        }}
                        className="flex-1 px-4 py-2 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
                      />
                      <button
                        onClick={() => {
                          addComment(post._id, comments[post._id]);
                        }}
                        disabled={!comments[post._id]?.trim()}
                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition font-bold"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
