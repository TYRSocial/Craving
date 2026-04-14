export const CRAVINGS = [
  { id: 1, name: 'Sweet', emoji: '🍰', color: 'bg-pink-100' },
  { id: 2, name: 'Spicy', emoji: '🌶️', color: 'bg-red-100' },
  { id: 3, name: 'Fast Food', emoji: '🍔', color: 'bg-yellow-100' },
  { id: 4, name: 'Healthy', emoji: '🥗', color: 'bg-green-100' },
  { id: 5, name: 'Seafood', emoji: '🦞', color: 'bg-blue-100' },
  { id: 6, name: 'Chinese', emoji: '🥡', color: 'bg-orange-100' },
  { id: 7, name: 'Italian', emoji: '🍝', color: 'bg-red-50' },
  { id: 8, name: 'Indian', emoji: '🍛', color: 'bg-yellow-50' },
];

export const FOOD_RECOMMENDATIONS = {
  1: ['Ice Cream', 'Cake', 'Chocolate', 'Donut', 'Candy', 'Cupcake'],
  2: ['Spicy Wings', 'Chili', 'Tandoori', 'Hot Curry', 'Jalapeño Poppers'],
  3: ['Burger', 'Pizza', 'Fries', 'Hot Dog', 'Sandwich'],
  4: ['Salad', 'Smoothie Bowl', 'Grilled Chicken', 'Veggie Wrap', 'Quinoa Bowl'],
  5: ['Fish & Chips', 'Shrimp', 'Crab', 'Salmon', 'Oysters'],
  6: ['Fried Rice', 'Noodles', 'Dumplings', 'Spring Rolls', 'Sweet & Sour'],
  7: ['Pasta', 'Risotto', 'Pizza', 'Tiramisu', 'Carbonara'],
  8: ['Curry', 'Biryani', 'Samosa', 'Butter Chicken', 'Tandoori'],
};

export const MOCK_RESTAURANTS = [
  { id: 1, name: 'Sweet Tooth Cafe', distance: '0.5 km', rating: 4.5 },
  { id: 2, name: 'Spice Garden', distance: '1.2 km', rating: 4.8 },
  { id: 3, name: 'Quick Bites', distance: '0.8 km', rating: 4.2 },
  { id: 4, name: 'Health Plate', distance: '1.5 km', rating: 4.6 },
  { id: 5, name: 'Sea Shore Diner', distance: '2 km', rating: 4.7 },
];

// Mood-based food recommendations
export const MOOD_RECOMMENDATIONS = {
  happy: {
    emoji: '😊',
    recommendations: ['Pizza', 'Ice Cream', 'Cake', 'Pasta', 'Candy'],
    color: 'bg-yellow-100',
  },
  sad: {
    emoji: '😢',
    recommendations: ['Chocolate', 'Comfort Food', 'Ice Cream', 'Cookies', 'Mac & Cheese'],
    color: 'bg-blue-100',
  },
  excited: {
    emoji: '🤩',
    recommendations: ['Spicy Food', 'Sushi', 'Burgers', 'Fried Chicken', 'Pizza'],
    color: 'bg-pink-100',
  },
  stressed: {
    emoji: '😰',
    recommendations: ['Tea', 'Salad', 'Soup', 'Smoothie', 'Fruit'],
    color: 'bg-green-100',
  },
  tired: {
    emoji: '😴',
    recommendations: ['Coffee', 'Energy Drink', 'Protein Shake', 'Nuts', 'Granola'],
    color: 'bg-purple-100',
  },
  relaxed: {
    emoji: '😌',
    recommendations: ['Seafood', 'Sushi', 'Salad', 'Smoothie Bowl', 'Organic Food'],
    color: 'bg-teal-100',
  },
  bored: {
    emoji: '😑',
    recommendations: ['Street Food', 'Food Truck', 'Ramen', 'Tacos', 'Kabab'],
    color: 'bg-gray-100',
  },
  energetic: {
    emoji: '⚡',
    recommendations: ['Gym Food', 'Protein Bowl', 'Smoothie', 'Salad', 'Grilled Chicken'],
    color: 'bg-orange-100',
  },
};

export const MOODS = Object.entries(MOOD_RECOMMENDATIONS).map(
  ([key, value]) => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    emoji: value.emoji,
  })
);
