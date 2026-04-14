'use client';

import { useState } from 'react';
import { CRAVINGS } from '@/lib/constants';

export default function CravingSelector({ 
  onSelectCraving, 
  selectedCraving = null,
  showAddNew = true 
}) {
  const [cravings, setCravings] = useState(CRAVINGS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCraving, setNewCraving] = useState({
    name: '',
    emoji: '',
    color: 'bg-blue-100',
  });

  const handleAddCraving = (e) => {
    e.preventDefault();
    
    if (!newCraving.name || !newCraving.emoji) {
      alert('Please fill in all fields');
      return;
    }

    const newId = Math.max(...cravings.map(c => c.id)) + 1;
    const cravingToAdd = {
      id: newId,
      name: newCraving.name,
      emoji: newCraving.emoji,
      color: newCraving.color,
    };

    setCravings([...cravings, cravingToAdd]);
    setNewCraving({ name: '', emoji: '', color: 'bg-blue-100' });
    setShowAddForm(false);
    
    // Notify parent component
    if (onSelectCraving) {
      onSelectCraving(cravingToAdd);
    }
  };

  return (
    <div className="w-full">
      {/* Craving Selection Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-dark mb-6">
          What are you craving today?
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cravings.map((craving) => (
            <button
              key={craving.id}
              onClick={() => onSelectCraving && onSelectCraving(craving)}
              className={`p-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 ${
                selectedCraving?.id === craving.id
                  ? `${craving.color} ring-4 ring-primary shadow-lg scale-105`
                  : `${craving.color} hover:shadow-md`
              }`}
            >
              <div className="text-4xl mb-2">{craving.emoji}</div>
              <p className="font-semibold text-sm text-dark">{craving.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Add New Craving Section */}
      {showAddNew && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              ➕ Add New Craving Category
            </button>
          ) : (
            <form onSubmit={handleAddCraving} className="bg-light p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-dark">Create New Craving</h3>
              
              <div className="space-y-4">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={newCraving.name}
                    onChange={(e) =>
                      setNewCraving({ ...newCraving, name: e.target.value })
                    }
                    placeholder="e.g., Dessert, Vegan, Fusion"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                    required
                  />
                </div>

                {/* Emoji Input */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Emoji *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength="2"
                      value={newCraving.emoji}
                      onChange={(e) =>
                        setNewCraving({ ...newCraving, emoji: e.target.value })
                      }
                      placeholder="🍪"
                      className="w-20 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-2xl text-center transition"
                      required
                    />
                    <div className="flex-1 text-sm text-gray-600 flex items-center">
                      <p>Paste an emoji here (copy from emoji keyboard)</p>
                    </div>
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Button Color
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      'bg-pink-100',
                      'bg-red-100',
                      'bg-yellow-100',
                      'bg-green-100',
                      'bg-blue-100',
                      'bg-purple-100',
                      'bg-orange-100',
                      'bg-teal-100',
                      'bg-indigo-100',
                      'bg-cyan-100',
                    ].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() =>
                          setNewCraving({ ...newCraving, color })
                        }
                        className={`h-10 rounded-lg border-2 transition-all ${
                          newCraving.color === color
                            ? `${color} border-dark scale-110`
                            : `${color} border-transparent hover:border-gray-400`
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {newCraving.name && newCraving.emoji && (
                  <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <button
                      type="button"
                      className={`p-6 rounded-lg ${newCraving.color}`}
                    >
                      <div className="text-3xl mb-2">{newCraving.emoji}</div>
                      <p className="font-semibold text-sm text-dark">
                        {newCraving.name}
                      </p>
                    </button>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-red-500 transition"
                  >
                    Add Craving
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setNewCraving({ name: '', emoji: '', color: 'bg-blue-100' });
                    }}
                    className="flex-1 bg-gray-300 text-dark py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Summary */}
      {selectedCraving && (
        <div className="mt-8 p-4 bg-white rounded-lg border-2 border-primary">
          <p className="text-sm text-gray-600">Currently selected:</p>
          <p className="text-2xl font-bold">
            {selectedCraving.emoji} {selectedCraving.name}
          </p>
        </div>
      )}
    </div>
  );
}
