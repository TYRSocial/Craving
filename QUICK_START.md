# 🚀 Quick Start Guide - A Craving

## ✨ Server is Running!

Your development server is now active on **http://localhost:3000**

---

## 🎯 Quick Test (2 minutes)

### Step 1: Register an Account
1. Visit http://localhost:3000/register
2. Enter your details:
   - **Name**: Your Name
   - **Email**: test@example.com
   - **Password**: password123
3. Click "Register"
4. You'll be redirected to /login

### Step 2: Login
1. Enter your credentials from Step 1
2. Click "Login"
3. Automatically redirected to `/dashboard`

### Step 3: Create a Post
1. Click "Create Post" in navbar
2. **Select a Mood**: Pick any mood button (Happy, Sad, Excited, etc.)
   - Notice the food recommendations update based on mood!
3. Fill in the form:
   - **Title**: "Craving some pizza!"
   - **Image URL**: `https://via.placeholder.com/600x400?text=Pizza`
   - **Category**: Select "Fast Food"
   - **Description**: "Fresh and delicious!"
4. Click "Create Post"
5. You'll be taken to the Feed

### Step 4: Test Like & Comment
1. On the Feed page, you should see your post
2. **Like**: Click the heart button (🤍 → ❤️)
3. **Comment**: Type a comment and press Enter
4. See comments update in real-time

### Step 5: Explore Mood Recommendations
1. Click "😊 Mood" in navbar
2. Click different mood buttons
3. Click on food recommendations to see details
4. View the reference guide at the bottom

### Step 6: Find Nearby Restaurants
1. Click "🗺️ Nearby" in navbar
2. Browser will ask for location permission - **Allow it** (or use mock location)
3. See restaurants within 5km
4. Click craving buttons to filter (Sweet, Spicy, etc.)
5. View restaurant details (name, distance, rating, menu items)

### Step 7: Try Craving Selector
1. Go to `/craving-demo` (or click through navbar)
2. Click different craving buttons to select them
3. Click "+ Add New Craving" button
4. Fill in:
   - **Name**: "Dessert"
   - **Emoji**: "🍮"
   - **Color**: Pick any color
5. See live preview before adding
6. Click "Add Craving"

---

## 📱 Test Responsive Design

1. Open DevTools (F12)
2. Toggle Device Toolbar (Ctrl+Shift+M)
3. Try different screen sizes:
   - Mobile (iPhone 12): 390px
   - Tablet (iPad): 768px
   - Desktop: Full width
4. Test hamburger menu on mobile

---

## 🧪 Advanced Testing

### Test Authentication
- Try logging out and going to `/feed` → Should redirect to `/login`
- Try accessing `/dashboard` without token → Should redirect to `/login`
- Clear localStorage and refresh → Should redirect to `/login`

### Test Post Features
- Create multiple posts with different moods
- Like the same post twice → Toggle unlike
- Add multiple comments to one post
- Create post without image → Should show error
- Create post without title → Should show error

### Test Location Features
- Go to `/nearby-restaurants` on desktop and mobile
- Try with geolocation enabled/disabled
- Filter by different craving categories
- Check that distances are calculated correctly

### Test Database Integration
- Check MongoDB is running: `mongosh` in terminal
- Create post, like, and comment
- Go to MongoDB Compass and check `craving` database
- See documents in `users`, `posts`, `shops` collections

---

## 🔧 Environment Setup

Your `.env.local` is configured with:
```
MONGODB_URI=mongodb://localhost:27017/craving
JWT_SECRET=craving_jwt_secret_key_2024_super_secret
```

**Make sure MongoDB is running:**
```powershell
# Windows
# MongoDB should already be running in background, or start it:
mongod

# Check connection:
mongosh
show dbs
```

---

## 📊 Test Data Creation

After logging in, create several posts to populate the feed:

**Post 1 - Happy Mood**
- Title: "Pizza Night!"
- Mood: Happy
- Category: Fast Food
- Image: https://via.placeholder.com/600x400?text=Pizza
- Recommendations shown: Pizza, Ice Cream, Cake, Pasta, Candy

**Post 2 - Sad Mood**
- Title: "Need Comfort Food"
- Mood: Sad
- Category: Sweet
- Image: https://via.placeholder.com/600x400?text=Chocolate
- Recommendations shown: Chocolate, Comfort Food, Ice Cream...

**Post 3 - Excited Mood**
- Title: "Let's Get Spicy!"
- Mood: Excited
- Category: Spicy
- Image: https://via.placeholder.com/600x400?text=Spicy+Food
- Recommendations shown: Spicy Food, Sushi, Burgers...

---

## 🎨 Color Guide

### Mood Colors
- Happy: 😊 Yellow/Amber
- Sad: 😢 Blue/Indigo
- Excited: 🤩 Pink/Red
- Stressed: 😰 Green/Emerald
- Tired: 😴 Purple
- Relaxed: 😌 Teal/Cyan
- Bored: 😑 Gray
- Energetic: ⚡ Orange

### Craving Colors
- Sweet: Pink (🍰)
- Spicy: Red (🌶️)
- Fast Food: Yellow (🍔)
- Healthy: Green (🥗)
- Seafood: Blue (🦞)
- Chinese: Orange (🥡)
- Italian: Light Red (🍝)
- Indian: Light Yellow (🍛)

---

## 📱 All Features at a Glance

| Feature | Route | Status |
|---------|-------|--------|
| Register | `/register` | ✅ Working |
| Login | `/login` | ✅ Working |
| Dashboard | `/dashboard` | ✅ Working |
| Create Post (with Mood) | `/create-post` | ✅ Working |
| Feed (Like/Comment) | `/feed` | ✅ Working |
| Mood Recommendations | `/mood-recommendations` | ✅ Working |
| Nearby Restaurants | `/nearby-restaurants` | ✅ Working |
| Craving Selector | `/craving-demo` | ✅ Working |
| Shop Owner Dashboard | `/shop` | ✅ Working |
| My Cravings | `/cravings` | ✅ Working |

---

## 🐛 Troubleshooting

### Server won't start
```powershell
# Kill any existing server
Get-Process node | Stop-Process -Force

# Try again
npm run dev
```

### MongoDB connection error
```powershell
# Make sure MongoDB is running
mongod

# Or check if already running:
Get-Process mongod

# If not, ensure MongoDB is installed and configured
```

### Port 3000 already in use
```powershell
# Find and kill process on port 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | Stop-Process -Force
```

### Geolocation not working
- Browser must have HTTPS (production) or localhost (development)
- Check browser permissions: Settings > Privacy > Location
- Falls back to mock NYC location if denied

### Image URLs not loading
- Make sure image URLs are accessible
- Test URLs: https://via.placeholder.com/600x400?text=Test
- Check browser console for CORS errors

---

## 🎯 Next Steps

1. ✅ Test all features locally
2. ✅ Create sample posts and test likes/comments
3. ✅ Verify mood-based recommendations work
4. ✅ Check nearby restaurants with geolocation
5. 📦 Run `npm run build` when ready to deploy
6. 🚀 Deploy to Vercel (or your chosen host)

---

## 📚 Documentation Files

- `FEATURES_COMPLETE.md` - Detailed feature documentation
- `GETTING_STARTED.md` - Setup and installation guide
- `CODE_DOCUMENTATION.md` - Code structure and API details
- `DEPLOYMENT.md` - Deployment instructions

---

## ✨ Enjoy Testing!

**Server Status**: 🟢 Running on http://localhost:3000

Everything is set up and ready to go. Create an account, make some posts, and explore all the features!

Questions? Check the documentation files or the code comments for more details.

Happy Cravings! 🍽️
