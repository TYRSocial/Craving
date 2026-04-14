'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && token) {
      router.push('/dashboard');
    }
  }, [token, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin">
          <div className="text-6xl">🍽️</div>
        </div>
      </div>
    );
  }

  if (token) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            <span className="text-3xl">🍽️</span>A Craving
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-purple-300 hover:text-white transition font-semibold">
              Sign In
            </Link>
            <Link href="/register" className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/50 transition">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                A Craving
              </h1>
              <p className="text-3xl text-purple-200 font-light">
                Share Your Food Journey
              </p>
            </div>

            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Join millions of food lovers discovering mood-based recommendations, sharing cravings, finding amazing restaurants, and connecting with a vibrant community passionate about food.
            </p>

            {/* Feature List */}
            <div className="space-y-4 pt-4">
              {[
                { emoji: '🍽️', title: 'Share Cravings', desc: 'Post food photos with mood tags' },
                { emoji: '😊', title: 'Mood Recommendations', desc: 'Get AI-powered food suggestions' },
                { emoji: '🗺️', title: 'Find Restaurants', desc: 'Discover places within 5km' },
                { emoji: '❤️', title: 'Connect & Engage', desc: 'Like, comment, share with friends' }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-purple-500/20">
                  <span className="text-3xl">{feature.emoji}</span>
                  <div>
                    <p className="font-bold text-white">{feature.title}</p>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <Link href="/register" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 active:scale-95">
                Get Started Free
              </Link>
              <Link href="/login" className="px-8 py-4 border-2 border-purple-400 text-purple-300 font-bold text-lg rounded-full hover:bg-purple-400/10 transition">
                Sign In
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-sm">
              {/* Gradient orbs */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-40 right-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
              
              {/* Mock Feed Cards */}
              <div className="relative z-10 space-y-6">
                {[
                  { name: 'Sarah', mood: '😊', food: 'Pizza Night', likes: '2.3K' },
                  { name: 'Mike', mood: '😴', food: 'Coffee & Vibes', likes: '1.8K' },
                  { name: 'Emma', mood: '🤩', food: 'Spicy Ramen', likes: '3.2K' }
                ].map((post, i) => (
                  <div key={i} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-5 border border-purple-500/30 backdrop-blur-lg hover:border-purple-500/60 transition hover:shadow-xl hover:shadow-purple-500/20 transform hover:scale-105">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full"></div>
                        <div>
                          <p className="font-bold text-white text-sm">{post.name}</p>
                          <p className="text-xs text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                      <span className="text-2xl">{post.mood}</span>
                    </div>
                    <p className="text-gray-200 font-semibold mb-3">{post.food}</p>
                    <div className="h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-purple-500/30 flex items-center justify-center">
                      <span className="text-4xl">{post.food.split(' ')[0][0]}</span>
                    </div>
                    <div className="flex gap-4 mt-3 text-sm text-gray-400">
                      <span>❤️ {post.likes}</span>
                      <span>💬 234</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-purple-500/20 py-20 bg-gradient-to-b from-transparent to-purple-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-black text-center mb-12 text-white">Join Our Community</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { stat: '50K+', label: 'Active Users', emoji: '👥' },
              { stat: '500K+', label: 'Posts Shared', emoji: '📸' },
              { stat: '2M+', label: 'Likes & Comments', emoji: '💬' },
              { stat: '1000+', label: 'Restaurants', emoji: '🏪' }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-purple-500/20 bg-white/5 hover:bg-white/10 transition">
                <p className="text-5xl mb-2">{item.emoji}</p>
                <p className="text-4xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{item.stat}</p>
                <p className="text-gray-400 mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-purple-500/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-6">Ready to Share Your Cravings?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of food enthusiasts discovering mood-based recommendations and connecting with people who share your passion.</p>
          <Link href="/register" className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 active:scale-95">
            Start Sharing Now
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-purple-500/20 py-8 text-center text-gray-500">
        <p>© 2026 A Craving. All rights reserved. | Made with 🍽️ & 💜</p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
