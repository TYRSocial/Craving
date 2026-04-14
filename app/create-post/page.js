'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CRAVINGS, MOODS, MOOD_RECOMMENDATIONS } from '@/lib/constants';

export default function CreatePostPage() {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    cravingCategory: '',
    mood: 'happy',
    visibility: 'public',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [loading, token, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMoodSelect = (moodId) => {
    setFormData((prev) => ({
      ...prev,
      mood: moodId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.title || !formData.imageUrl || !formData.cravingCategory) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      router.push('/feed');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !token) {
    return null;
  }

  const selectedMoodData = MOOD_RECOMMENDATIONS[formData.mood];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">Share Your Craving</h1>
        <p className="text-gray-300 text-lg mb-8">Express what you're craving and inspire others</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 text-red-200 backdrop-blur-xl">
            <p className="font-semibold">Error:</p>
            {error}
          </div>
        )}

        <div className="bg-gradient-to-br from-slate-800 to-slate-700 border border-purple-500/20 rounded-2xl p-8 sm:p-10 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Mood Selection */}
            <div>
              <label className="block text-lg font-black mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">How are you feeling? 😊</label>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-6">
                {MOODS.map((mood) => (
                  <button
                    key={mood.id}
                    type="button"
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`p-4 rounded-xl transition text-center transform ${
                      formData.mood === mood.id
                        ? 'ring-2 ring-purple-400 scale-110 bg-gradient-to-br from-slate-700 to-slate-600'
                        : 'bg-slate-700/50 hover:bg-slate-700/80 border border-slate-600'
                    }`}
                  >
                    <div className="text-3xl mb-2">{mood.emoji}</div>
                    <div className="font-semibold text-white text-xs">{mood.name}</div>
                  </button>
                ))}
              </div>
              {selectedMoodData && (
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 p-5 rounded-xl backdrop-blur-sm">
                  <p className="font-bold text-purple-300 text-sm mb-2">✨ Mood Recommendations:</p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {selectedMoodData.recommendations.join(' • ')}
                  </p>
                </div>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-3">
                Post Title * ✍️
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What are you craving?"
                required
                className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-3">
                Description 💭
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us more about your craving... (optional)"
                rows="4"
                className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-3">
                Image URL * 📸
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                required
                className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition"
              />
              {formData.imageUrl && (
                <div className="mt-6 relative group">
                  <div className="rounded-xl overflow-hidden border border-purple-400/30 h-80 sm:h-96">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      onError={() => console.error('Failed to load image')}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              )}
            </div>

            {/* Craving Category */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-3">
                Craving Category * 🍽️
              </label>
              <select
                name="cravingCategory"
                value={formData.cravingCategory}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition cursor-pointer"
              >
                <option value="" className="bg-slate-800">Select a category</option>
                {CRAVINGS.map((craving) => (
                  <option key={craving.id} value={craving.name} className="bg-slate-800">
                    {craving.emoji} {craving.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Visibility */}
            <div>
              <label className="block text-sm font-bold text-purple-300 mb-3">
                Visibility 👥
              </label>
              <select
                name="visibility"
                value={formData.visibility}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-slate-700/50 border border-purple-400/30 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent transition cursor-pointer"
              >
                <option value="public" className="bg-slate-800">Public - Everyone can see</option>
                <option value="friends" className="bg-slate-800">Friends Only</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span>Creating...</span>
                  <span className="animate-spin">✨</span>
                </span>
              ) : (
                <span>Share Your Craving 🎉</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
