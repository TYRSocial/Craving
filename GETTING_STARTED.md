# 🚀 A Craving - Getting Started Guide

Welcome to A Craving! This guide will walk you through everything step by step.

## 📋 Table of Contents
1. [What is A Craving?](#what-is-a-craving)
2. [System Requirements](#system-requirements)
3. [Local Setup (5 minutes)](#local-setup)
4. [Running the App](#running-the-app)
5. [Testing the Features](#testing-the-features)
6. [Deploying to Production](#deploying-to-production)
7. [Troubleshooting](#troubleshooting)

---

## What is A Craving?

A Craving is a modern food discovery and sharing platform where:
- **Users** can explore food cravings, share posts, like/comment, and save preferences
- **Shop Owners** can list their food items and manage their restaurant
- **Community** discovers food trends and connects with other food lovers

**Tech Stack:**
- Frontend: Next.js 13+ with React 19
- Backend: Node.js API routes
- Database: MongoDB
- Styling: Tailwind CSS
- Auth: JWT tokens

---

## System Requirements

### Minimum Requirements
- **Node.js**: 18.17.0 or higher
- **npm**: 8.0 or higher
- **RAM**: 512MB minimum
- **Disk Space**: 500MB

### Recommended
- **Node.js**: 20+ LTS
- **RAM**: 2GB+
- **Internet**: For image uploads

### Optional (for production)
- GitHub account
- MongoDB Atlas or local MongoDB
- Vercel account

---

## Local Setup

### Option 1: Automated Setup (Windows)

```bash
# Navigate to the project
cd c:\Users\ANAND HARAK\Downloads\craving

# Run the startup script
start.bat
```

### Option 2: Manual Setup (All OS)

#### Step 1: Navigate to Project
```bash
cd c:\Users\ANAND HARAK\Downloads\craving
# or
cd /path/to/craving
```

#### Step 2: Install Node Dependencies
```bash
npm install
```

This will install all required packages (~1-2 minutes).

#### Step 3: Setup Environment Variables

The `.env.local` file is already created. Verify it has:
```env
MONGODB_URI=mongodb://localhost:27017/craving
JWT_SECRET=craving_jwt_secret_key_2024_super_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=craving_nextauth_secret_2024_super_secret
```

**If you want to use MongoDB Atlas instead of local MongoDB:**

1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Update `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/craving
```

#### Step 4: Ensure MongoDB is Running (Local Only)

**Windows:**
```bash
mongod
```

**macOS:**
```bash
brew services start mongodb-community
# or
mongod
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or use MongoDB Atlas** (cloud database - no local setup needed)

---

## Running the App

### Development Mode (Hot Reload)
```bash
npm run dev
```

Output:
```
> a-craving@1.0.0 dev
> next dev

  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

**Open browser to:** http://localhost:3000

### Production Mode (Optimized)
```bash
npm run build
npm start
```

---

## Testing the Features

### 1. Test Welcome Screen
- App opens with "Namaste 🙏"
- Click "Let's Begin"
- Select different craving categories
- See food recommendations and restaurants

### 2. Create Test Account (Regular User)
```
Name: John Doe
Email: john@test.com
Password: password123
☐ I'm a shop owner (leave unchecked)
```

### 3. Test Craving System
- Go to "My Cravings" page
- Click different craving icons
- Click "+ Save" on 3 categories
- Verify they appear in "My Cravings" section

### 4. Create a Test Post
- Go to "Create Post"
- Fill the form:
  - Title: "Best Pasta Ever!"
  - Description: "Had this amazing pasta today"
  - Image URL: https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400
  - Category: Italian
  - Visibility: Public
- Click "Create Post"
- See your post in the Feed

### 5. Test Social Features
- Go to "Feed"
- Click ❤️ to like posts
- Type a comment and click "Post"
- See your comments appear

### 6. Test Shop Owner Features

**Create Shop Owner Account:**
```
Name: Pizza Palace
Email: pizza@shop.com
Password: password123
☑ I'm a shop owner (CHECK this box)
```

**After login:**
- Go to "My Shop"
- Click "Create Shop"
- Wait a moment
- Page refreshes with shop interface
- Add food items:
  - Name: Margherita Pizza
  - Price: 12.99
  - Category: Italian
  - Image URL: https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400
  - Description: Classic Italian pizza
  - Click "Add Item"
- See items listed below form

### 7. Test Navigation
- Click all navbar links
- Use mobile menu (on small screens)
- Logout and login again
- Verify token persistence

---

## Understanding the App Flow

### User Journey
```
Landing Page (Namaste 🙏)
    ↓
Select Craving
    ↓
View Recommendations
    ↓
Login/Register
    ↓
Dashboard
    ├── Explore Cravings
    ├── Create Post
    ├── View Feed
    ├── My Cravings
    └── (Shop Panel if owner)
```

### Data Flow
```
React Component
    ↓
Form Submit
    ↓
API Route (/api/...)
    ↓
Database (MongoDB)
    ↓
Response
    ↓
Update Component State
    ↓
Re-render UI
```

---

## File Structure Quick Reference

```
craving/
├── app/
│   ├── page.js           → Welcome screen
│   ├── login/page.js     → Login page
│   ├── register/page.js  → Registration page
│   ├── dashboard/page.js → Main dashboard
│   ├── feed/page.js      → Social feed
│   ├── cravings/page.js  → Craving explorer
│   ├── create-post/page.js → Create post
│   ├── shop/page.js      → Shop owner panel
│   ├── api/              → API routes
│   └── layout.js         → Root layout
├── lib/
│   ├── auth.js           → Auth context
│   ├── jwt.js            → JWT utilities
│   ├── mongodb.js        → DB connection
│   └── constants.js      → App constants
├── models/
│   ├── User.js
│   ├── Post.js
│   └── Shop.js
├── components/
│   └── Navbar.js         → Navigation
└── styles/
    └── globals.css       → Global styles
```

---

## Deploying to Production

### Quick Deploy to Vercel (Recommended)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/a-craving.git
git push -u origin main
```

#### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repo
4. Add environment variables
5. Click "Deploy"

**For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

---

## Troubleshooting

### "Port 3000 is already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID {PID} /F

# macOS/Linux
lsof -i :3000
kill -9 {PID}
```

### "Cannot find mongodb"
- Make sure MongoDB is running
- Or update `MONGODB_URI` to use MongoDB Atlas (cloud)

### "npm install fails"
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### "Styles not showing (Tailwind not working)"
```bash
# Rebuild Tailwind
npx tailwindcss -i ./styles/globals.css -o ./styles/output.css
npm run dev
```

### "Image not loading in posts"
- Make sure image URL is directly accessible (not behind login)
- Check URL availability in new browser tab
- Use HTTPS URLs if possible

### "Login always redirects to login page"
- Clear localStorage: Open DevTools → Application → Clear site data
- Check token in `.env.local` is set
- Verify MongoDB is running

### Still having issues?
See [CODE_DOCUMENTATION.md](./CODE_DOCUMENTATION.md) for detailed code explanations.

---

## Key Commands Reference

```bash
# Development
npm run dev              # Start dev server (hot reload)
npm run build            # Build for production
npm start                # Start production server

# Database
npx mongo                # Connect to MongoDB
mongodb                  # Start MongoDB service

# Git
git add .                # Stage all changes
git commit -m "message"  # Commit changes
git push                 # Push to GitHub
```

---

## What's Next?

### Feature Ideas to Add
- [ ] Follow users
- [ ] Friend requests
- [ ] Search functionality
- [ ] Location-based recommendations (using Google Maps)
- [ ] Restaurant ratings and reviews
- [ ] Notifications
- [ ] Dark mode
- [ ] User profiles

### Learning Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [MongoDB](https://docs.mongodb.com)
- [Vercel Deployment](https://vercel.com/docs)

---

## Support

### Documentation
- **Complete Setup**: [README.md](./README.md)
- **Deployment**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Code Details**: [CODE_DOCUMENTATION.md](./CODE_DOCUMENTATION.md)

### Quick Links
- Next.js Docs: https://nextjs.org/docs
- MongoDB Docs: https://docs.mongodb.com
- Vercel Support: https://vercel.com/support
- Tailwind CSS: https://tailwindcss.com

---

## ✅ Success Checklist

- [ ] Node.js 18+ installed
- [ ] Project files downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` configured
- [ ] MongoDB running (local or Atlas)
- [ ] Dev server started (`npm run dev`)
- [ ] App opens at localhost:3000
- [ ] Can register a user
- [ ] Can create a post
- [ ] Can like/comment on posts

**If all checkmarks are complete, you're ready to develop! 🎉**

---

## License

This project is open source and available under the MIT License.

## Contributors

Built with ❤️ for the food-loving community.

**Happy Craving! 🍽️**
