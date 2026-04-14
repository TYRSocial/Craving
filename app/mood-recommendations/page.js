'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MOODS, MOOD_RECOMMENDATIONS } from '@/lib/constants';

export default function MoodRecommendationsPage() {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState('happy');
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [loading, token, router]);

  if (loading || !token) {
    return null;
  }

  const moodData = MOOD_RECOMMENDATIONS[selectedMood];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">🎯 Mood-Based Recommendations</h1>
          <p className="text-gray-300 text-lg">
            Select your mood and discover food recommendations tailored just for you
          </p>
        </div>

        {/* Mood Selector */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 sm:p-10 mb-12 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white mb-8">How are you feeling today?</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {MOODS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              const moodInfo = MOOD_RECOMMENDATIONS[mood.id];

              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-6 rounded-xl transition transform ${
                    isSelected
                      ? 'ring-2 ring-green-400 scale-110 bg-gradient-to-br from-slate-700 to-slate-600 shadow-xl shadow-green-500/20'
                      : 'bg-slate-700/50 border border-slate-600 hover:border-green-400/50 hover:bg-slate-700/80'
                  }`}
                >
                  <div className="text-5xl mb-3">{mood.emoji}</div>
                  <div className="font-bold text-white text-sm">{mood.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommendations Display */}
        {moodData && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 sm:p-10 mb-12 backdrop-blur-xl overflow-hidden">
            <div className="max-w-5xl">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 flex items-center gap-4 bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                <span className="text-5xl">{moodData.emoji}</span>
                {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Mood
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Based on your mood, here are some delicious food options you might enjoy:
              </p>

              {/* Recommendation Cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {moodData.recommendations.map((recommendation, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRecommendation(recommendation)}
                    className={`p-6 rounded-xl transition transform text-left ${
                      selectedRecommendation === recommendation
                        ? 'ring-2 ring-green-400 scale-105 bg-gradient-to-br from-slate-700 to-slate-600'
                        : 'bg-slate-700/50 border border-slate-600 hover:border-green-400/50 hover:bg-slate-700/80'
                    }`}
                  >
                    <div className="text-4xl mb-3">🍽️</div>
                    <div className="text-2xl font-bold text-white">{recommendation}</div>
                    <div className="text-sm text-gray-400 mt-3">
                      ✨ Click to learn more
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Recommendation Details */}
              {selectedRecommendation && (
                <div className="p-8 bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-xl backdrop-blur-sm">
                  <h3 className="text-4xl font-bold text-white mb-4">🍽️ {selectedRecommendation}</h3>
                  <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                    Perfect for your <span className="text-emerald-400 font-bold">{selectedMood}</span> mood! This delightful option is known for bringing joy and satisfaction. Whether you're enjoying it at a restaurant or preparing it at home, it's guaranteed to brighten your day.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-700/50 border border-emerald-500/30 p-4 rounded-lg">
                      <h4 className="font-bold text-emerald-400 mb-2">⏰ Best Time</h4>
                      <p className="text-gray-300">Any time of day</p>
                    </div>
                    <div className="bg-slate-700/50 border border-emerald-500/30 p-4 rounded-lg">
                      <h4 className="font-bold text-emerald-400 mb-2">🥤 Pairs With</h4>
                      <p className="text-gray-300">Coffee or Juice</p>
                    </div>
                    <div className="bg-slate-700/50 border border-emerald-500/30 p-4 rounded-lg">
                      <h4 className="font-bold text-emerald-400 mb-2">💚 Why This Mood</h4>
                      <p className="text-gray-300">Boosts happiness</p>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition transform hover:scale-105 active:scale-95">
                    Find Restaurants 🗺️
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All Moods Reference */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 sm:p-10 backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-white mb-8">📚 Mood Reference Guide</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {MOODS.map((mood) => {
              const info = MOOD_RECOMMENDATIONS[mood.id];
              return (
                <div key={mood.id} className="bg-gradient-to-br from-slate-700 to-slate-600 border border-purple-500/20 p-6 rounded-xl hover:border-purple-500/50 transition">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{mood.emoji}</span>
                    <h3 className="text-2xl font-bold text-white">
                      {mood.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-4">
                    Recommended foods:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {info.recommendations.map((rec, idx) => (
                      <span
                        key={idx}
                        className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 px-3 py-2 rounded-full text-sm font-semibold text-emerald-300"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
