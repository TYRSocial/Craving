# A Craving - Complete Code Documentation

## 📁 File Structure Overview

### Core Files
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `.env.local` - Environment variables (local development)
- `.gitignore` - Git ignore rules

---

## 🔑 Key Code Files

### Authentication Flow

#### `lib/auth.js`
React context for authentication. Handles:
- User login/registration
- Token management
- Persistent auth state

```javascript
// Usage in components
const { user, token, login, register, logout } = useAuth();
```

#### `lib/jwt.js`
JWT token generation and verification:
- `generateToken(userId)` - Create JWT token
- `verifyToken(token)` - Verify and decode token
- `extractToken(req)` - Extract from request headers

#### `app/api/auth/register/route.js`
User registration endpoint:
- Validates email doesn't exist
- Hashes password with bcryptjs
- Returns JWT token

#### `app/api/auth/login/route.js`
User login endpoint:
- Validates email and password
- Compares hashed password
- Returns JWT token

---

### Craving System

#### `lib/constants.js`
Pre-defined craving categories and food recommendations:
```javascript
export const CRAVINGS = [
  { id: 1, name: 'Sweet', emoji: '🍰', color: 'bg-pink-100' },
  // ... 7 more categories
];

export const FOOD_RECOMMENDATIONS = {
  1: ['Ice Cream', 'Cake', 'Chocolate', ...],
  // ...
};
```

#### `app/api/cravings/route.js`
Get all cravings:
```javascript
GET /api/cravings
Response: { cravings: [...] }
```

#### `app/api/cravings/[id]/route.js`
Get craving details with recommendations:
```javascript
GET /api/cravings/1
Response: { 
  foodItems: [...],
  restaurants: [...]
}
```

#### `app/api/cravings/my-cravings/route.js`
Manage user's saved cravings:
```javascript
GET /api/cravings/my-cravings          // Get saved cravings
POST /api/cravings/my-cravings         // Save a craving
DELETE /api/cravings/my-cravings       // Remove saved craving
```

---

### Posts & Feed

#### `models/Post.js`
Post database schema:
```javascript
{
  userId: ObjectId,              // User who created post
  title: String,                 // Post title
  description: String,           // Post description
  imageUrl: String,              // Image URL
  cravingCategory: String,       // Craving type
  visibility: 'public'/'friends',
  likes: Array,                  // Array of user IDs who liked
  comments: Array,               // Array of comments
  likeCount: Number,
  commentCount: Number,
  timestamps                      // createdAt, updatedAt
}
```

#### `app/api/posts/route.js`
Post management:
```javascript
GET /api/posts                  // Get all public posts
POST /api/posts                 // Create new post (requires token)
```

Request body:
```javascript
{
  title: "Amazing Burger",
  description: "Just had this...",
  imageUrl: "https://...",
  cravingCategory: "Fast Food",
  visibility: "public"           // or "friends"
}
```

#### `app/api/posts/[id]/like/route.js`
Like/unlike posts:
```javascript
POST /api/posts/123/like        // Toggle like status
```

#### `app/api/posts/[id]/comment/route.js`
Add comments to posts:
```javascript
POST /api/posts/123/comment
Body: { text: "Great photo!" }
```

---

### Shop System

#### `models/Shop.js`
Shop database schema:
```javascript
{
  ownerId: ObjectId,
  shopName: String,
  description: String,
  location: GeoJSON,
  address: String,
  phone: String,
  email: String,
  foodItems: [{
    name: String,
    price: Number,
    cravingCategory: String,
    imageUrl: String,
    description: String
  }],
  rating: Number,
  reviews: Array,
  timestamps
}
```

#### `app/api/shops/route.js`
Shop management:
```javascript
GET /api/shops                  // Get all shops
POST /api/shops                 // Create shop (requires token, isShopOwner)
```

Request body:
```javascript
{
  shopName: "My Food Shop",
  description: "Best food in town",
  address: "123 Main St",
  phone: "+1-555-1234",
  email: "owner@shop.com",
  foodItems: []
}
```

#### `app/api/shops/[id]/route.js`
Update shop items:
```javascript
PUT /api/shops/456
Body: {
  foodItems: [
    {
      name: "Butter Chicken",
      price: 12.99,
      cravingCategory: "Indian",
      imageUrl: "https://...",
      description: "Creamy curry sauce"
    }
  ]
}
```

---

### Frontend Pages

#### `app/page.js` - Welcome Screen
- Displays "Namaste 🙏" greeting
- Shows craving selection
- Food recommendations
- Routes to login/register

#### `app/login/page.js` - Login
- Email/password login
- Error handling
- Redirect to dashboard on success

#### `app/register/page.js` - Registration
- Name, email, password registration
- Shop owner checkbox
- Creates user account
- Auto-login on success

#### `app/dashboard/page.js` - Main Dashboard
- User greeting
- Quick action cards
- Saved cravings display
- Navigation to all features

#### `app/cravings/page.js` - Craving Explorer
- All 8 craving categories
- Save/unsave cravings
- Food recommendations
- Nearby restaurants

#### `app/feed/page.js` - Social Feed
- All public posts
- Like/unlike functionality
- Comment system
- User interactions

#### `app/create-post/page.js` - Create Post
- Image URL input
- Title and description
- Category selection
- Visibility settings
- Form validation

#### `app/shop/page.js` - Shop Owner Panel
- Create shop (if not exists)
- Add food items
- Manage inventory
- Shop statistics

---

### Database Models

#### `models/User.js`
User schema with password hashing:
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  bio: String,
  isShopOwner: Boolean,
  shopName: String,
  shopLocation: String,
  location: GeoJSON Point,
  myCravings: [{
    cravingId: Number,
    cravingName: String,
    addedAt: Date
  }],
  timestamps
}
```

**Methods:**
- `comparePassword(password)` - Verify password match

#### `models/SavedCraving.js`
Tracking saved cravings:
```javascript
{
  userId: ObjectId,
  cravingId: Number,
  cravingName: String,
  emoji: String,
  timestamps
}
```

---

### Utilities

#### `lib/mongodb.js`
MongoDB connection management:
```javascript
import { connectDB } from '@/lib/mongodb';

// Usage in API routes
await connectDB();
// Now can use mongoose models
```

#### `lib/withAuth.js`
Higher-order component for protected routes:
```javascript
import { withAuth } from '@/lib/withAuth';

export default withAuth(ProtectedComponent);
```

#### `components/Navbar.js`
Navigation component with:
- Logo and branding
- Navigation links
- User menu with logout
- Mobile responsive hamburger

---

## 🔄 Data Flow Examples

### Login Flow
```
User submits email/password
        ↓
POST /api/auth/login
        ↓
Server validates credentials
        ↓
Generate JWT token
        ↓
Return token + user data
        ↓
Client stores in localStorage
        ↓
Redirect to dashboard
```

### Create Post Flow
```
User fills post form
        ↓
Click "Create Post"
        ↓
POST /api/posts (with JWT token)
        ↓
Server verifies token
        ↓
Create post in MongoDB
        ↓
Return post object
        ↓
Redirect to feed
        ↓
New post visible to all users
```

### Save Craving Flow
```
User selects craving
        ↓
Click "Save"
        ↓
POST /api/cravings/my-cravings (with JWT)
        ↓
Server adds to user's myCravings array
        ↓
Return updated list
        ↓
UI shows "✓ Saved" button
        ↓
Appears in "My Cravings" page
```

---

## 🎨 Component Architecture

### Page Structure
Every authenticated page follows this structure:

```javascript
'use client';  // Client-side component

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [loading, token, router]);

  // Fetch data
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading || !token) return null;

  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        {/* Page content */}
      </div>
    </div>
  );
}
```

---

## 🔐 API Authentication

### Request with Token
```javascript
const res = await fetch('/api/posts', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```

### Server Verification
```javascript
import { extractToken, verifyToken } from '@/lib/jwt';

export async function POST(req) {
  const token = extractToken(req);  // Get from header
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const decoded = verifyToken(token);  // Verify and decode
  
  if (!decoded) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  
  const userId = decoded.userId;  // Use in logic
  // ...
}
```

---

## 📝 Common Patterns

### Fetch Data with Token
```javascript
useEffect(() => {
  if (token) {
    const fetchData = async () => {
      const res = await fetch('/api/endpoint', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setData(data);
    };
    fetchData();
  }
}, [token]);
```

### Handle Form Submission
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const res = await fetch('/api/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) throw new Error('Request failed');
    
    const data = await res.json();
    // Handle success
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### Toggle Like/Save Button
```javascript
const isLiked = post.likes?.find(like => like.userId === user.id);

<button
  onClick={() => toggleLike(postId)}
  className={isLiked ? 'bg-red-500' : 'bg-gray-200'}
>
  {isLiked ? '❤️' : '🤍'}
</button>
```

---

## 🐛 Common Issues & Solutions

### "useAuth must be used within AuthProvider"
- Ensure page has `'use client'` at top
- Ensure layout.js wraps children in `<ClientWrapper>`

### Token not persisting on refresh
- Check localStorage is enabled in browser
- Verify `JWT_SECRET` in `.env.local`
- Check token expiration in `jwt.js`

### Images not loading in posts
- Verify image URL is publicly accessible
- Check CORS headers in `next.config.js`
- Use absolute URLs, not relative paths

### Database connection issues
- Ensure MongoDB is running (or MongoDB Atlas connected)
- Verify `MONGODB_URI` in `.env.local`
- Check database user exists with correct password

---

**This covers all major code components and patterns. Happy coding! 🚀**
