'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CRAVINGS } from '@/lib/constants';

export default function DashboardPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [myCravings, setMyCravings] = useState([]);

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [loading, token, router]);

  useEffect(() => {
    if (token) {
      fetchMyCravings();
    }
  }, [token]);

  const fetchMyCravings = async () => {
    try {
      if (!token) {
        setMyCravings([]);
        return;
      }
      const res = await fetch('/api/cravings/my-cravings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.error('Failed to fetch cravings:', res.status);
        setMyCravings([]);
        return;
      }
      const data = await res.json();
      setMyCravings(data.myCravings || []);
    } catch (error) {
      console.error('Failed to fetch cravings:', error);
      setMyCravings([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  const savedCravings = CRAVINGS.filter((c) =>
    myCravings.find((mc) => mc.cravingId === c.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-2xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                Welcome, {user?.name}! 👋
              </h1>
              <p className="text-gray-300 text-lg">
                Explore cravings, share your food moments, and connect with food lovers
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Explore Cravings Card */}
          <a
            href="/cravings"
            className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition transform hover:scale-105 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl">🍽️</div>
              <div className="text-purple-400 opacity-0 group-hover:opacity-100 transition">→</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Explore Cravings</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover different food cravings and get personalized recommendations
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-purple-400/30">
              <span className="text-pink-400 font-semibold text-sm">Explore Now</span>
              <span className="text-pink-400">→</span>
            </div>
          </a>

          {/* Create Post Card */}
          <a
            href="/create-post"
            className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition transform hover:scale-105 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl">📸</div>
              <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition">→</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Create Post</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Share your food photos and mood with the community
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 rounded-full border border-cyan-400/30">
              <span className="text-cyan-400 font-semibold text-sm">Create Now</span>
              <span className="text-cyan-400">→</span>
            </div>
          </a>

          {/* Discover Feed Card */}
          <a
            href="/feed"
            className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition transform hover:scale-105 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl">💬</div>
              <div className="text-pink-400 opacity-0 group-hover:opacity-100 transition">→</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Discover Feed</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              See what others are craving and engage with the community
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 px-4 py-2 rounded-full border border-pink-400/30">
              <span className="text-pink-400 font-semibold text-sm">View Feed</span>
              <span className="text-pink-400">→</span>
            </div>
          </a>

          {/* Nearby Restaurants Card */}
          <a
            href="/nearby-restaurants"
            className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition transform hover:scale-105 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl">🗺️</div>
              <div className="text-amber-400 opacity-0 group-hover:opacity-100 transition">→</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Find Nearby</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Discover restaurants near you and find your next craving
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2 rounded-full border border-amber-400/30">
              <span className="text-amber-400 font-semibold text-sm">Explore Map</span>
              <span className="text-amber-400">→</span>
            </div>
          </a>

          {/* Mood Recommendations Card */}
          <a
            href="/mood-recommendations"
            className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition transform hover:scale-105 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="text-5xl">😊</div>
              <div className="text-green-400 opacity-0 group-hover:opacity-100 transition">→</div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Mood Recommendations</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Get food suggestions based on your mood
            </p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 rounded-full border border-green-400/30">
              <span className="text-green-400 font-semibold text-sm">Check Moods</span>
              <span className="text-green-400">→</span>
            </div>
          </a>

          {/* Shop Dashboard Card (if shop owner) */}
          {user?.isShopOwner && (
            <a
              href="/shop"
              className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition transform hover:scale-105 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-5xl">🏪</div>
                <div className="text-violet-400 opacity-0 group-hover:opacity-100 transition">→</div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">My Shop</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Manage your shop menu and food items
              </p>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 px-4 py-2 rounded-full border border-violet-400/30">
                <span className="text-violet-400 font-semibold text-sm">Manage Shop</span>
                <span className="text-violet-400">→</span>
              </div>
            </a>
          )}
        </div>

        {/* My Saved Cravings Section */}
        {myCravings.length > 0 && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 sm:p-10">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-8">
              My Saved Cravings ❣️
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {savedCravings.map((craving) => (
                <div
                  key={craving.id}
                  className="bg-gradient-to-br from-slate-700 to-slate-600 border border-purple-500/20 p-6 rounded-xl text-center hover:border-purple-500/50 transition transform hover:scale-110 cursor-pointer"
                >
                  <div className="text-5xl mb-3 drop-shadow-lg">{craving.emoji}</div>
                  <p className="font-bold text-white text-sm">{craving.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
