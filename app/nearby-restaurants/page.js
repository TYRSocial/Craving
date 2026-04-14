'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CRAVINGS } from '@/lib/constants';

export default function NearbyRestaurantsPage() {
  const { token, loading } = useAuth();
  const router = useRouter();
  const [shops, setShops] = useState([]);
  const [selectedCraving, setSelectedCraving] = useState(null);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [loading, token, router]);

  // Get user's location
  useEffect(() => {
    if (token) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
            setLocationLoading(false);
            fetchNearbyShops(latitude, longitude, selectedCraving);
          },
          (error) => {
            console.error('Geolocation error:', error);
            // Set default location (mock location)
            setUserLocation({
              latitude: 40.7128,
              longitude: -74.006,
            });
            setLocationLoading(false);
          }
        );
      } else {
        // Geolocation not supported, use mock location
        setUserLocation({
          latitude: 40.7128,
          longitude: -74.006,
        });
        setLocationLoading(false);
      }
    }
  }, [token]);

  const fetchNearbyShops = async (lat, lon, craving = null) => {
    try {
      setLoading2(true);
      setError('');
      const params = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        maxDistance: 5000, // 5km
      });

      if (craving) {
        params.append('craving', craving);
      }

      const res = await fetch(`/api/shops/nearby?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch shops');

      const data = await res.json();
      setShops(data.shops || []);
    } catch (err) {
      setError(err.message);
      setShops([]);
    } finally {
      setLoading2(false);
    }
  };

  const handleCravingFilter = (craving) => {
    setSelectedCraving(craving === selectedCraving ? null : craving);
    if (userLocation) {
      fetchNearbyShops(
        userLocation.latitude,
        userLocation.longitude,
        craving === selectedCraving ? null : craving
      );
    }
  };

  if (loading || locationLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-white mb-4">📍 Loading your location...</p>
          <div className="animate-spin text-4xl">🌍</div>
        </div>
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent mb-2">🗺️ Nearby Restaurants</h1>
          <p className="text-gray-300 text-lg mb-4">
            Discover restaurants near you serving your favorite cravings
          </p>
          {userLocation && (
            <div className="inline-flex items-center gap-2 bg-white/10 border border-amber-500/30 rounded-full px-6 py-3 backdrop-blur-xl">
              <span className="text-amber-400">📍</span>
              <span className="text-sm text-gray-300">
                {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)} 
                <span className="text-amber-400"> • 5km radius</span>
              </span>
            </div>
          )}
        </div>

        {/* Craving Filter */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-purple-300 mb-5">Filter by Craving 🍽️</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {CRAVINGS.map((craving) => (
              <button
                key={craving.id}
                onClick={() => handleCravingFilter(craving.name)}
                className={`p-4 rounded-xl font-semibold transition transform ${
                  selectedCraving === craving.name
                    ? 'ring-2 ring-amber-400 scale-110 bg-gradient-to-br from-slate-700 to-slate-600'
                    : 'bg-slate-700/50 border border-slate-600 hover:border-amber-400/50 hover:bg-slate-700/80'
                }`}
              >
                <div className="text-2xl mb-2">{craving.emoji}</div>
                <div className="text-xs text-white">{craving.name}</div>
              </button>
            ))}
            {selectedCraving && (
              <button
                onClick={() => {
                  setSelectedCraving(null);
                  if (userLocation) {
                    fetchNearbyShops(userLocation.latitude, userLocation.longitude);
                  }
                }}
                className="p-4 rounded-xl font-bold bg-slate-700/50 border border-slate-600 hover:border-red-400/50 hover:bg-slate-700/80 transition text-white"
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200 backdrop-blur-xl">
            ❌ {error}
          </div>
        )}

        {/* Loading */}
        {loading2 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-300 mb-4">🔍 Finding restaurants near you...</p>
            <div className="inline-block animate-spin text-4xl">🍽️</div>
          </div>
        )}

        {/* Restaurants List */}
        {!loading2 && shops.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-300">
              {selectedCraving
                ? `No restaurants found serving ${selectedCraving}`
                : 'No restaurants found nearby. Try adjusting your location or filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop) => (
              <div
                key={shop._id}
                className="group bg-gradient-to-br from-slate-800 to-slate-700 border border-orange-500/20 rounded-2xl overflow-hidden hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/20 transition transform hover:scale-105"
              >
                {/* Shop Header */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition">{shop.shopName}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{shop.description}</p>

                  {/* Distance */}
                  <div className="flex items-center gap-3 bg-white/10 border border-amber-500/30 rounded-lg px-4 py-2 w-fit backdrop-blur-sm">
                    <span className="text-lg">📍</span>
                    <span className="font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      {Math.round(shop.distance * 100) / 100} km away
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="text-sm text-gray-300 space-y-1">
                    <p className="flex items-center gap-2"><span>📍</span>{shop.address}</p>
                    {shop.phone && <p className="flex items-center gap-2"><span>📞</span>{shop.phone}</p>}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-3 bg-white/10 border border-yellow-500/30 rounded-lg px-4 py-2 w-fit backdrop-blur-sm">
                    <span className="text-lg">⭐</span>
                    <span className="font-bold text-white">{shop.rating.toFixed(1)}</span>
                    {shop.reviews && (
                      <span className="text-gray-400 text-sm">
                        ({shop.reviews.length})
                      </span>
                    )}
                  </div>

                  {/* Food Items */}
                  {shop.foodItems && shop.foodItems.length > 0 && (
                    <div className="pt-2">
                      <h4 className="font-bold text-purple-300 mb-3">🍽️ Featured Items:</h4>
                      <div className="space-y-2">
                        {shop.foodItems.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-start bg-slate-700/50 border border-purple-500/20 p-3 rounded-lg"
                          >
                            <div>
                              <p className="font-semibold text-white text-sm">{item.name}</p>
                              <p className="text-xs text-gray-400">
                                {item.cravingCategory}
                              </p>
                            </div>
                            <p className="font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                              ${item.price?.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition transform hover:scale-105 active:scale-95">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
