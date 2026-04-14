'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ShopPage() {
  const { token, loading, user } = useAuth();
  const router = useRouter();
  const [shop, setShop] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    cravingCategory: '',
    imageUrl: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
    if (!loading && user && !user.isShopOwner) {
      router.push('/dashboard');
    }
  }, [loading, token, user, router]);

  useEffect(() => {
    if (token && user?.isShopOwner) {
      fetchShops();
    }
  }, [token, user]);

  const fetchShops = async () => {
    try {
      const res = await fetch('/api/shops', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const ownerShop = data.shops?.find(
        (s) => s.ownerId._id === user.id || s.ownerId === user.id
      );
      setShop(ownerShop || null);
      setFoodItems(ownerShop?.foodItems || []);
    } catch (error) {
      console.error('Failed to fetch shop:', error);
      setError('Failed to load shop data');
    } finally {
      setIsLoading(false);
    }
  };

  const createShop = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shopName: user.name + "'s Food Shop",
          address: 'Your Shop Address',
          phone: '',
          email: user.email,
          foodItems: [],
        }),
      });

      if (!res.ok) throw new Error('Failed to create shop');

      const data = await res.json();
      setShop(data.shop);
    } catch (err) {
      setError(err.message);
    }
  };

  const addFoodItem = async (e) => {
    e.preventDefault();
    setError('');

    if (!newItem.name || !newItem.price || !newItem.cravingCategory) {
      setError('Please fill in name, price, and category');
      return;
    }

    try {
      const updatedItems = [...foodItems, newItem];
      const res = await fetch(`/api/shops/${shop._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ foodItems: updatedItems }),
      });

      if (!res.ok) throw new Error('Failed to add food item');

      const data = await res.json();
      setFoodItems(data.shop.foodItems);
      setNewItem({
        name: '',
        price: '',
        cravingCategory: '',
        imageUrl: '',
        description: '',
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading || !user?.isShopOwner) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-600">
            {error}
          </div>
        )}

        {!shop ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Your Shop</h2>
            <p className="text-gray-600 mb-6">
              Get started by creating your food shop to sell items
            </p>
            <button
              onClick={createShop}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-500 transition"
            >
              Create Shop
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h1 className="text-4xl font-bold mb-4">{shop.shopName}</h1>
              <p className="text-gray-600 mb-4">📍 {shop.address}</p>
              <div className="flex gap-6">
                <div>
                  <span className="text-gray-600">Rating:</span>
                  <p className="font-bold">⭐ {shop.rating || 'No ratings yet'}</p>
                </div>
                <div>
                  <span className="text-gray-600">Items:</span>
                  <p className="font-bold">{foodItems.length} items</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Add New Food Item</h2>
              <form onSubmit={addFoodItem} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Item Name *
                    </label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                      placeholder="e.g., Butter Chicken"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      value={newItem.price}
                      onChange={(e) =>
                        setNewItem({ ...newItem, price: e.target.value })
                      }
                      placeholder="9.99"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category *
                    </label>
                    <input
                      type="text"
                      value={newItem.cravingCategory}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          cravingCategory: e.target.value,
                        })
                      }
                      placeholder="e.g., Indian"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={newItem.imageUrl}
                      onChange={(e) =>
                        setNewItem({ ...newItem, imageUrl: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    placeholder="Describe your dish..."
                    rows="3"
                    className="w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-red-500 transition"
                >
                  Add Item
                </button>
              </form>
            </div>

            {foodItems.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Your Food Items</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {foodItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {item.cravingCategory}
                      </p>
                      <p className="text-primary font-bold text-lg mb-2">
                        ${item.price}
                      </p>
                      {item.description && (
                        <p className="text-gray-700 text-sm">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
