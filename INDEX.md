# 📚 A Craving - Complete Documentation Index

Welcome! This document serves as your navigation hub for all A Craving documentation and resources.

---

## 🚀 Quick Links by Use Case

### I Want to Get Started Right Now
👉 Start here: **[GETTING_STARTED.md](./GETTING_STARTED.md)**
- Step-by-step setup (5 minutes)
- Testing features
- Troubleshooting

### I Need to Deploy to Production
👉 Start here: **[DEPLOYMENT.md](./DEPLOYMENT.md)**
- Vercel deployment (recommended)
- MongoDB Atlas setup
- Production checklist
- Scaling guidance

### I Need a Quick Command Reference
👉 Start here: **[COMMANDS_REFERENCE.md](./COMMANDS_REFERENCE.md)**
- npm scripts
- Database commands
- Git commands
- Debugging tips

### I Want to Understand the Code
👉 Start here: **[CODE_DOCUMENTATION.md](./CODE_DOCUMENTATION.md)**
- File-by-file explanations
- Data flow diagrams
- Common patterns
- API reference

### I Need a Project Overview
👉 Start here: **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**
- Feature list
- Technology stack
- File structure
- Development roadmap

### I Need Complete Setup Details
👉 Start here: **[README.md](./README.md)**
- Full documentation
- Features overview
- API routes
- Local development

---

## 📖 Documentation Files

| File | Purpose | Best For |
|------|---------|----------|
| **README.md** | Complete project documentation | Overview & reference |
| **GETTING_STARTED.md** | Beginner-friendly step-by-step | New developers |
| **DEPLOYMENT.md** | Production deployment guide | DevOps & backend devs |
| **CODE_DOCUMENTATION.md** | Detailed code explanations | Code review & learning |
| **PROJECT_SUMMARY.md** | Features & metrics summary | Project planning |
| **COMMANDS_REFERENCE.md** | CLI commands reference | Daily development |
| **INDEX.md** (this file) | Navigation & quick reference | Finding what you need |

---

## 🎯 Setup Checklist

### ✅ Local Development Setup
- [ ] Node.js 18+ installed
- [ ] Project files downloaded
- [ ] Run `npm install`
- [ ] Configure `.env.local`
- [ ] Start MongoDB (or use Atlas)
- [ ] Run `npm run dev`
- [ ] Open http://localhost:3000

### ✅ Testing Features
- [ ] Create an account
- [ ] Explore cravings
- [ ] Create a post
- [ ] Like and comment

### ✅ Shop Owner Features
- [ ] Register as shop owner
- [ ] Create shop
- [ ] Add food items

### ✅ Production Deployment
- [ ] Push to GitHub
- [ ] Connect to Vercel
- [ ] Configure environment variables
- [ ] Deploy and verify

---

## 🏗️ Project Structure at a Glance

```
craving/
│
├─ 📚 Documentation
│  ├─ README.md                    (Main documentation)
│  ├─ GETTING_STARTED.md           (Beginner guide)
│  ├─ DEPLOYMENT.md                (Production guide)
│  ├─ CODE_DOCUMENTATION.md        (Code details)
│  ├─ PROJECT_SUMMARY.md           (Feature list)
│  └─ COMMANDS_REFERENCE.md        (Command cheatsheet)
│
├─ ⚙️ Configuration
│  ├─ package.json                 (Dependencies)
│  ├─ next.config.js               (Next.js config)
│  ├─ tailwind.config.js           (Tailwind config)
│  ├─ postcss.config.js            (PostCSS config)
│  ├─ .env.local                   (Environment vars)
│  └─ .gitignore                   (Git ignore)
│
├─ 🖥️ Frontend (app/)
│  ├─ page.js                      (Welcome screen)
│  ├─ layout.js                    (Root layout)
│  ├─ login/page.js                (Login page)
│  ├─ register/page.js             (Register page)
│  ├─ dashboard/page.js            (Dashboard)
│  ├─ cravings/page.js             (Craving explorer)
│  ├─ feed/page.js                 (Social feed)
│  ├─ create-post/page.js          (Create post)
│  ├─ shop/page.js                 (Shop panel)
│  └─ api/                         (Backend routes)
│
├─ 🔧 API Endpoints (app/api/)
│  ├─ auth/                        (Authentication)
│  ├─ cravings/                    (Craving system)
│  ├─ posts/                       (Social posts)
│  └─ shops/                       (Shop management)
│
├─ 🔗 Components (components/)
│  └─ Navbar.js                    (Navigation)
│
├─ 📦 Utilities (lib/)
│  ├─ auth.js                      (Auth context)
│  ├─ jwt.js                       (JWT helpers)
│  ├─ mongodb.js                   (Database)
│  ├─ constants.js                 (App constants)
│  └─ withAuth.js                  (Protected routes)
│
├─ 💾 Database (models/)
│  ├─ User.js                      (User schema)
│  ├─ Post.js                      (Post schema)
│  ├─ Shop.js                      (Shop schema)
│  └─ SavedCraving.js              (Craving tracking)
│
├─ 🎨 Styles (styles/)
│  └─ globals.css                  (Global styles)
│
├─ 📁 Public (public/)
│  └─ (Static assets)
│
└─ 🚀 Scripts
   ├─ start.sh                     (Unix startup)
   └─ start.bat                    (Windows startup)
```

---

## 🔑 Core Concepts

### Authentication
- **Method:** JWT tokens
- **Storage:** localStorage
- **Duration:** 30 days
- **Validation:** Server-side verification

### Database
- **Provider:** MongoDB
- **Format:** JSON documents
- **Collections:** User, Post, Shop, SavedCraving

### Frontend
- **Framework:** Next.js 13+
- **Styling:** Tailwind CSS
- **State:** React Context API

### Deployment
- **Platform:** Vercel (recommended)
- **Database:** MongoDB Atlas
- **Domain:** Custom domain support

---

## 📱 User Flows

### Regular User Flow
```
Landing → Register → Login → Dashboard 
    ↓
Explore Cravings → Save Favorites
    ↓
Create Post → View Feed → Like & Comment
```

### Shop Owner Flow
```
Landing → Register (as owner) → Login → Dashboard
    ↓
Create Shop → Add Items → Manage Inventory
    ↓
Items visible to customers
```

---

## 🔄 Key API Endpoints

### Authentication (3 endpoints)
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Cravings (3 endpoints)
- `GET /api/cravings` - All categories
- `GET /api/cravings/[id]` - Category details
- `POST /api/cravings/my-cravings` - Save craving

### Posts (3 endpoints)
- `GET /api/posts` - View feed
- `POST /api/posts` - Create post
- `POST /api/posts/[id]/like` - Like post
- `POST /api/posts/[id]/comment` - Add comment

### Shops (3 endpoints)
- `GET /api/shops` - View all shops
- `POST /api/shops` - Create shop
- `PUT /api/shops/[id]` - Update items

---

## 🎨 Design System

| Element | Color | Usage |
|---------|-------|-------|
| Primary | #FF6B6B | Buttons, links, highlights |
| Secondary | #4ECDC4 | Accents, secondary buttons |
| Dark | #1A1A1A | Text, dark backgrounds |
| Light | #F8F9FA | Page backgrounds |

---

## 🚀 Getting Started Paths

### Path 1: Complete Beginner (30 minutes)
```
1. Read: GETTING_STARTED.md (5 min)
2. Install: npm install (3 min)
3. Setup: Configure .env.local (2 min)
4. Start: npm run dev (2 min)
5. Test: Explore features (18 min)
```

### Path 2: Experienced Developer (10 minutes)
```
1. npm install
2. cp .env.local.example .env.local
3. npm run dev
4. Visit http://localhost:3000
```

### Path 3: Deploy to Production (20 minutes)
```
1. Read: DEPLOYMENT.md (5 min)
2. Setup MongoDB Atlas (5 min)
3. Push to GitHub (3 min)
4. Deploy to Vercel (7 min)
```

---

## 📊 Important Files by Category

### Configuration
- `package.json` - Dependencies
- `.env.local` - Secrets & URLs
- `next.config.js` - Next.js settings

### Authentication
- `lib/auth.js` - User context
- `lib/jwt.js` - Token handling
- `app/api/auth/*` - Auth endpoints

### Database
- `lib/mongodb.js` - Connection logic
- `models/*.js` - Schema definitions

### Pages
- `app/[name]/page.js` - Each route
- `components/Navbar.js` - Navigation

### Styling
- `styles/globals.css` - Global CSS
- `tailwind.config.js` - Tailwind config

---

## 🔗 External Resources

### Official Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [MongoDB Docs](https://docs.mongodb.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Docs](https://vercel.com/docs)

### Learning Resources
- [Next.js Tutorial](https://nextjs.org/learn)
- [React Tutorial](https://react.dev/learn)
- [MongoDB University](https://university.mongodb.com)

### Community
- [Next.js Discord](https://discord.gg/bUG7F8jesJ)
- [React Community](https://react.dev/community)
- [MongoDB Community](https://www.mongodb.com/community)

---

## ⚡ Quick Commands

```bash
# Setup (first time)
npm install

# Development
npm run dev

# Production
npm run build
npm start

# Deployment
git push origin main

# Database
mongosh
```

---

## 🆘 Need Help?

### For Getting Started
→ See **GETTING_STARTED.md**

### For Code Questions
→ See **CODE_DOCUMENTATION.md**

### For Commands
→ See **COMMANDS_REFERENCE.md**

### For Deployment
→ See **DEPLOYMENT.md**

### For Feature Overview
→ See **PROJECT_SUMMARY.md**

---

## ✅ Success Indicators

You'll know you're on the right track when:
- ✅ `npm install` completes without errors
- ✅ `.env.local` is configured
- ✅ `npm run dev` starts the server
- ✅ http://localhost:3000 loads in browser
- ✅ You can register a new account
- ✅ You can create and view posts
- ✅ You can deploy to Vercel successfully

---

## 🎓 Learning Path

### Week 1: Fundamentals
- [ ] Setup local environment
- [ ] Explore the codebase
- [ ] Understand file structure
- [ ] Read CODE_DOCUMENTATION.md
- [ ] Test all features

### Week 2: Development
- [ ] Add a new feature
- [ ] Modify existing pages
- [ ] Update database schemas
- [ ] Customize styling

### Week 3: Deployment
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Configure custom domain
- [ ] Monitor production

---

## 📞 Common Questions

**Q: Where do I start?**
A: Read [GETTING_STARTED.md](./GETTING_STARTED.md)

**Q: How do I deploy?**
A: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

**Q: How do I add a new feature?**
A: See patterns in [CODE_DOCUMENTATION.md](./CODE_DOCUMENTATION.md)

**Q: What commands do I need?**
A: Check [COMMANDS_REFERENCE.md](./COMMANDS_REFERENCE.md)

**Q: What features are included?**
A: See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

---

## 🎉 You're Ready!

Everything is set up for you to:
- ✅ Learn modern web development
- ✅ Build production-quality applications
- ✅ Deploy to real users
- ✅ Scale your projects

**Start with [GETTING_STARTED.md](./GETTING_STARTED.md) and enjoy! 🍽️**

---

**Last Updated:** April 2026
**Version:** 1.0.0
**Status:** Complete & Production Ready ✅
