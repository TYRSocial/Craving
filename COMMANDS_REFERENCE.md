# A Craving - Quick Command Reference

## 🚀 Getting Started Commands

### 1. Navigate to Project
```bash
cd c:\Users\ANAND HARAK\Downloads\craving
```

### 2. Install Dependencies (One Time)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

**Open in browser:** http://localhost:3000

---

## 📦 NPM Scripts Reference

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Database
npx mongo            # Connect to MongoDB
mongod               # Start MongoDB service
```

---

## 🔧 Environment Setup Commands

### Setup .env.local (if not exists)
```bash
cp .env.local.example .env.local
```

### Verify Environment Variables
```bash
cat .env.local          # macOS/Linux
type .env.local         # Windows
```

---

## 🛠️ Useful Development Commands

### Kill Process on Port 3000
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID {PID_NUMBER} /F

# macOS/Linux
lsof -i :3000
kill -9 {PID_NUMBER}
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check Node Version
```bash
node --version
npm --version
```

---

## 🗄️ MongoDB Commands

### Start MongoDB (Local)
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Connect to MongoDB
```bash
mongosh
```

### View Databases
```javascript
show dbs
use craving
db.users.find()
```

---

## 📤 Git & Deployment Commands

### Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: A Craving app"
```

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/a-craving.git
git branch -M main
git push -u origin main
```

### Deploy to Vercel (CLI)
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🧪 Testing Commands

### Run All Tests (when test setup is complete)
```bash
npm test
```

### Build to Check for Errors
```bash
npm run build
```

### Check Linting
```bash
npm run lint
```

---

## 📝 Useful Development Tips

### Access API Endpoints During Development

**Example 1: Get all cravings**
```bash
curl http://localhost:3000/api/cravings
```

**Example 2: Login user**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Check Running Processes
```bash
# Windows
tasklist | findstr node

# macOS/Linux
ps aux | grep node
```

### View System Resources
```bash
# Windows
tasklist

# macOS
top

# Linux
top
```

---

## 🐛 Debugging Commands

### View Next.js Build Errors
```bash
npm run build 2>&1 | head -50
```

### Clear Next.js Cache
```bash
rm -rf .next
npm run build
```

### Check MongoDB Connection
```bash
mongosh --eval "db.adminCommand('ping')"
```

### View Environment Variables
```bash
# macOS/Linux
env | grep MONGODB

# Windows
set | findstr MONGODB
```

---

## 📊 Database Backup/Restore

### Backup MongoDB Database
```bash
mongodump --db craving --out ./backup
```

### Restore MongoDB Database
```bash
mongorestore --db craving ./backup/craving
```

---

## 🔐 Security Commands

### Generate Strong JWT Secret (macOS/Linux)
```bash
openssl rand -hex 32
```

### Generate Strong Secret (Windows PowerShell)
```powershell
[System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((New-Guid).Guid + (New-Guid).Guid))
```

---

## 📱 Mobile Testing

### Test on Mobile (Local Network)
```bash
npm run dev
# Find your IP address
ipconfig getifaddr en0  # macOS
hostname -I             # Linux
ipconfig               # Windows

# Visit from mobile: http://{YOUR_IP}:3000
```

---

## 🚀 Production Deployment Checklist

```bash
# 1. Update environment
cp .env.local .env.production.local

# 2. Build production version
npm run build

# 3. Test production build locally
npm start

# 4. Commit changes
git add .
git commit -m "Production build ready"

# 5. Push to GitHub
git push origin main

# 6. Vercel auto-deploys from main branch
# (if connected)
```

---

## 🆘 Quick Troubleshooting Commands

```bash
# Problem: npm install fails
npm cache clean --force
npm install

# Problem: Port 3000 in use
# Windows: taskkill /PID {NUMBER} /F
# Mac/Linux: kill -9 {PID}
lsof -i :3000

# Problem: MongoDB not found
# Check connection
mongosh --eval "db.adminCommand('ping')"

# Problem: Styles not loading
npm run build
npm run dev

# Problem: Clear all cache
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

---

## 📞 Command Help

```bash
# Next.js help
next --help

# npm help
npm help

# MongoDB help
mongosh --help

# Git help
git help
```

---

## 🎯 Complete Fresh Start

If you want to completely restart:

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Remove dependencies
rm -rf node_modules package-lock.json

# 3. Reset git (optional)
rm -rf .git

# 4. Clear cache
npm cache clean --force

# 5. Reinstall
npm install

# 6. Start fresh
npm run dev
```

---

## ⭐ Essential Commands Summary

```bash
# Getting Started
npm install              # Install once
npm run dev             # Always start with this

# When Things Break
ctrl + c                # Stop dev server
npm cache clean --force # Clear npm cache
rm -rf .next            # Clear Next.js cache
npm run build           # Check for build errors

# Deployment
git push origin main    # Push to GitHub
# Vercel auto-deploys   # (if connected)
```

---

## 🔗 Helpful Resources

- **Official Docs:** https://nextjs.org/docs
- **API Reference:** https://nodejs.org/api
- **MongoDB:** https://docs.mongodb.com/manual
- **Tailwind:** https://tailwindcss.com/docs

---

**Keep this as your handy reference while developing! 🚀**
