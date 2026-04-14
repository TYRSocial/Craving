'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { CRAVINGS, FOOD_RECOMMENDATIONS, MOCK_RESTAURANTS } from '@/lib/constants';

export default function Home() {
  const [step, setStep] = useState(0);
  const [selectedCraving, setSelectedCraving] = useState(null);
  const { user, token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      // Redirect to login after showing welcome screen
      const timer = setTimeout(() => {
        router.push('/login');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loading, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary p-4">
        <div className="text-white text-center">
          {step === 0 && (
            <div className="animate-bounce">
              <h1 className="text-6xl mb-4">Namaste 🙏</h1>
              <p className="text-2xl mb-8">Welcome to A Craving</p>
              <button
                onClick={() => setStep(1)}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Let's Begin
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-4xl font-bold mb-12">
                What are you craving today?
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
                {CRAVINGS.map((craving) => (
                  <button
                    key={craving.id}
                    onClick={() => setSelectedCraving(craving)}
                    className={`p-6 rounded-lg font-semibold transition-all text-lg ${
                      selectedCraving?.id === craving.id
                        ? 'bg-white text-primary scale-105'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <div className="text-3xl mb-2">{craving.emoji}</div>
                    {craving.name}
                  </button>
                ))}
              </div>

              {selectedCraving && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Popular {selectedCraving.name} options:
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6">
                    {FOOD_RECOMMENDATIONS[selectedCraving.id].map((food) => (
                      <div
                        key={food}
                        className="bg-white/20 p-3 rounded-lg text-white"
                      >
                        {food}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    Nearby places:
                  </h3>
                  <div className="space-y-2 max-w-md mx-auto mb-8">
                    {MOCK_RESTAURANTS.slice(0, 3).map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="bg-white/20 p-3 rounded-lg text-left text-white"
                      >
                        <div className="font-semibold">{restaurant.name}</div>
                        <div className="text-sm">
                          {restaurant.distance} • ⭐ {restaurant.rating}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
                    >
                      Login to Continue
                    </Link>
                    <div className="text-sm">
                      <Link href="/register" className="underline hover:no-underline">
                        or create an account
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Logged in user goes to dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome, {user?.name}! 👋</h1>
        <p className="text-2xl mb-8">Redirecting to dashboard...</p>
        <Link
          href="/dashboard"
          className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
