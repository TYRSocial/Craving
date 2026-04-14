# A Craving - Complete Setup Guide

A modern food craving discovery and sharing platform built with Next.js, MongoDB, and Tailwind CSS.

## 📁 Folder Structure

```
a-craving/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.js
│   │   │   ├── register/route.js
│   │   │   └── me/route.js
│   │   ├── cravings/
│   │   │   ├── route.js
│   │   │   ├── [id]/route.js
│   │   │   └── my-cravings/route.js
│   │   ├── posts/
│   │   │   ├── route.js
│   │   │   ├── [id]/like/route.js
│   │   │   └── [id]/comment/route.js
│   │   └── shops/
│   │       ├── route.js
│   │       └── [id]/route.js
│   ├── dashboard/page.js
│   ├── login/page.js
│   ├── register/page.js
│   ├── feed/page.js
│   ├── cravings/page.js
│   ├── create-post/page.js
│   ├── shop/page.js
│   ├── layout.js
│   ├── page.js
│   └── client-wrapper.js
├── components/
│   └── Navbar.js
├── lib/
│   ├── auth.js
│   ├── jwt.js
│   ├── mongodb.js
│   ├── withAuth.js
│   └── constants.js
├── models/
│   ├── User.js
│   ├── Post.js
│   ├── Shop.js
│   └── SavedCraving.js
├── styles/
│   └── globals.css
├── public/
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.local.example
└── .gitignore
```

## 🚀 Quick Start - Local Development

### Prerequisites
- Node.js 18+ and npm
- MongoDB running locally or MongoDB Atlas account

### Step 1: Setup Environment

```bash
# Copy the example env file
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
MONGODB_URI=mongodb://localhost:27017/craving
JWT_SECRET=your-super-secret-jwt-key-change-this
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-key
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start MongoDB (if local)

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
brew services start mongodb-community
# or
mongod
```

### Step 4: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Features & User Flows

### 1. **Welcome Screen**
- Shows "Namaste 🙏" greeting
- Displays craving options
- Shows food recommendations and nearby places
- Routes to login/register

### 2. **Authentication**
- User registration (regular user or shop owner)
- Email/password login
- JWT token stored in localStorage
- Session persistence

### 3. **User Dashboard**
- Welcome message
- Quick links to features
- Saved cravings display
- Navigation to all sections

### 4. **Craving Selection**
- 8 different craving categories:
  - Sweet 🍰
  - Spicy 🌶️
  - Fast Food 🍔
  - Healthy 🥗
  - Seafood 🦞
  - Chinese 🥡
  - Italian 🍝
  - Indian 🍛
- Food recommendations per category
- Nearby restaurants
- Save/unsave cravings

### 5. **Posts & Feed**
- Upload posts with image, title, description
- Select craving category
- Set visibility (public/friends)
- Like posts
- Comment on posts
- View community feed

### 6. **Shop Owner Panel**
- Sign up as shop owner
- Create/manage shop
- Add food items with:
  - Name
  - Price
  - Category
  - Image
  - Description
- View shop stats

## 🔌 API Routes

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/me             - Get current user (requires token)
```

### Cravings
```
GET    /api/cravings            - Get all cravings
GET    /api/cravings/[id]       - Get craving details & recommendations
GET    /api/cravings/my-cravings    - Get user's saved cravings
POST   /api/cravings/my-cravings    - Save a craving
DELETE /api/cravings/my-cravings    - Remove saved craving
```

### Posts
```
GET    /api/posts               - Get all public posts
POST   /api/posts               - Create new post
POST   /api/posts/[id]/like     - Like/unlike a post
POST   /api/posts/[id]/comment  - Add comment to post
```

### Shops
```
GET    /api/shops               - Get all shops
POST   /api/shops               - Create shop (shop owner)
PUT    /api/shops/[id]          - Update shop items (shop owner)
```

## 🔐 Authentication

The app uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in
2. Server returns JWT token
3. Token stored in `localStorage`
4. Token sent in `Authorization: Bearer {token}` header for protected routes
5. Token verified on server before allowing access

## 📊 Database Models

### User
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
  myCravings: Array,
  timestamps
}
```

### Post
```javascript
{
  userId: ObjectId,
  title: String,
  description: String,
  imageUrl: String,
  cravingCategory: String,
  visibility: String (public/friends),
  likes: Array,
  comments: Array,
  likeCount: Number,
  commentCount: Number,
  timestamps
}
```

### Shop
```javascript
{
  ownerId: ObjectId,
  shopName: String,
  description: String,
  location: GeoJSON Point,
  address: String,
  phone: String,
  email: String,
  foodItems: Array,
  rating: Number,
  reviews: Array,
  timestamps
}
```

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Primary Color**: #FF6B6B (Red)
- **Secondary Color**: #4ECDC4 (Teal)
- **Responsive**: Mobile-first design

## 📦 Key Dependencies

```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.1.2",
  "bcryptjs": "^2.4.3",
  "tailwindcss": "^3.4.0"
}
```

## 🐧 Testing the App

### Test User Account
```
Email: test@example.com
Password: password123
```

### Test Shop Owner Account
```
Email: shop@example.com
Password: password123
(Select "I'm a shop owner" during registration)
```

### Test Features
1. Register a new account
2. Explore different cravings
3. Save cravings to "My Cravings"
4. Create a post with an image URL
5. Like and comment on posts
6. Toggle between user and shop owner views

## 🚢 Deploy to Vercel

### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Push to GitHub
```bash
git remote add origin https://github.com/yourusername/a-craving.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_SECRET` - Your secret key
   - `NEXTAUTH_URL` - Your Vercel deployment URL
   - `NEXTAUTH_SECRET` - Your NextAuth secret

### Step 4: Deploy
Click "Deploy" and wait for the deployment to complete.

## 📚 MongoDB Atlas Setup (for Production)

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in Vercel environment variables:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/craving
   ```

## 🛠️ Development Tips

### Add New Craving
Edit `lib/constants.js`:
```javascript
export const CRAVINGS = [
  { id: 9, name: 'Dessert', emoji: '🍪', color: 'bg-yellow-100' },
  // ...
];

export const FOOD_RECOMMENDATIONS = {
  9: ['Brownie', 'Cookie', 'Cake', 'Pie'],
  // ...
};
```

### Add New Route
Create file in `app/[route]/page.js` with:
```javascript
'use client';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';

export default function Page() {
  const { token, loading } = useAuth();
  
  if (loading || !token) return null;
  
  return (
    <div className="min-h-screen bg-light">
      <Navbar />
      {/* Your content */}
    </div>
  );
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
MongoNetworkError: failed to connect to server
```
- Ensure MongoDB is running locally or check MongoDB Atlas connection string
- Verify `MONGODB_URI` in `.env.local`

### JWT Token Errors
```
Invalid token
```
- Clear browser localStorage
- Log out and log back in
- Ensure `JWT_SECRET` is set in `.env.local`

### Image Not Loading in Posts
- Use direct image URL (not relative path)
- Ensure URL is publicly accessible
- Check network tab in browser DevTools

## 📞 Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Mongoose**: https://mongoosejs.com/docs

---

**Happy Craving! 🍽️**
