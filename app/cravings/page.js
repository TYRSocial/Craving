'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CRAVINGS, FOOD_RECOMMENDATIONS, MOCK_RESTAURANTS } from '@/lib/constants';

export default function CravingsPage() {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [selectedCraving, setSelectedCraving] = useState(null);
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
      const res = await fetch('/api/cravings/my-cravings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMyCravings(data.myCravings || []);
    } catch (error) {
      console.error('Failed to fetch cravings:', error);
    }
  };

  const saveCraving = async (cravingId) => {
    try {
      const res = await fetch('/api/cravings/my-cravings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cravingId }),
      });
      const data = await res.json();
      setMyCravings(data.myCravings || []);
    } catch (error) {
      console.error('Failed to save craving:', error);
    }
  };

  const removeCraving = async (cravingId) => {
    try {
      const res = await fetch('/api/cravings/my-cravings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cravingId }),
      });
      const data = await res.json();
      setMyCravings(data.myCravings || []);
    } catch (error) {
      console.error('Failed to remove craving:', error);
    }
  };

  if (loading || !token) {
    return null;
  }

  const isSaved = (cravingId) => myCravings.some((c) => c.cravingId === cravingId);

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">What are you craving?</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          {CRAVINGS.map((craving) => (
            <div
              key={craving.id}
              onClick={() => setSelectedCraving(craving)}
              className={`${craving.color} p-6 rounded-lg cursor-pointer transition-transform hover:scale-105 text-center ${
                selectedCraving?.id === craving.id ? 'ring-4 ring-primary' : ''
              }`}
            >
              <div className="text-4xl mb-2">{craving.emoji}</div>
              <p className="font-semibold mb-3">{craving.name}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (isSaved(craving.id)) {
                    removeCraving(craving.id);
                  } else {
                    saveCraving(craving.id);
                  }
                }}
                className={`text-xs px-3 py-1 rounded-full transition ${
                  isSaved(craving.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-primary'
                }`}
              >
                {isSaved(craving.id) ? '✓ Saved' : '+ Save'}
              </button>
            </div>
          ))}
        </div>

        {selectedCraving && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {selectedCraving.emoji} {selectedCraving.name}
            </h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-4">Popular Items</h3>
                <div className="space-y-3">
                  {FOOD_RECOMMENDATIONS[selectedCraving.id].map((food) => (
                    <div
                      key={food}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                    >
                      🍴 {food}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Nearby Restaurants</h3>
                <div className="space-y-3">
                  {MOCK_RESTAURANTS.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                    >
                      <div className="font-semibold">{restaurant.name}</div>
                      <div className="text-sm text-gray-600">
                        📍 {restaurant.distance} • ⭐ {restaurant.rating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
