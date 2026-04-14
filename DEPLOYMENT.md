# A Craving - Deployment Guide

## 🌐 Deploying to Vercel (Recommended)

Vercel is the recommended hosting for Next.js apps. It's free, fast, and integrates seamlessly.

### Prerequisites
- GitHub account
- Vercel account (free at vercel.com)
- MongoDB Atlas account (free tier available)

### Step 1: Setup MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up with Google or email
3. Create a free cluster:
   - Click "Create a Deployment"
   - Select "M0 Free Tier"
   - Choose your region
   - Click "Create Deployment"

4. Create database user:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `cravinguser`
   - Password: Generate secure password (save it!)
   - Click "Add User"

5. Allow network access:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (or add your IP)

6. Get connection string:
   - Go to "Databases"
   - Click "Connect"
   - Select "Drivers"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `myFirstDatabase` with `craving`

Example:
```
mongodb+srv://cravinguser:mypassword123@cluster0.abc123.mongodb.net/craving?retryWrites=true&w=majority
```

### Step 2: Push Code to GitHub

```bash
cd /path/to/craving
git init
git add .
git commit -m "Initial commit: A Craving app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/a-craving.git
git push -u origin main
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Search for and select your `a-craving` repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - Leave other settings as default
6. Add environment variables:
   ```
   MONGODB_URI = mongodb+srv://cravinguser:password@cluster.abc123.mongodb.net/craving
   JWT_SECRET = your-super-secret-jwt-key-here
   NEXTAUTH_URL = https://your-project.vercel.app
   NEXTAUTH_SECRET = your-super-secret-nextauth-key
   ```
7. Click "Deploy"
8. Wait 2-5 minutes for deployment

#### Option B: Using Vercel CLI

```bash
npm install -g vercel

vercel login

vercel --prod
```

Follow the prompts to link your GitHub repo and set environment variables.

### Step 4: Verify Deployment

After deployment completes:
1. Visit your Vercel deployment URL (usually `https://a-craving.vercel.app`)
2. Test the app:
   - Create an account
   - Select a craving
   - Create a post
   - Test shop owner features

## 📱 Deploy to Other Platforms

### Railway

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add MongoDB plugin
4. Set environment variables
5. Deploy

### Render

1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

### AWS Amplify

1. Go to [aws.amazon.com/amplify](https://aws.amazon.com/amplify)
2. Connect GitHub repository
3. Configure build settings
4. Add environment variables
5. Deploy

## 🔐 Security Best Practices

### Before Production

1. **Change Secrets**
   - Generate strong `JWT_SECRET`
   - Generate strong `NEXTAUTH_SECRET`
   - Use `crypto.randomBytes(32).toString('hex')` or [generate here](https://www.random.org/strings/)

2. **Update Database Security**
   - Use strong password for MongoDB user
   - Restrict IP access if possible
   - Enable database authentication

3. **Enable HTTPS**
   - Vercel automatically enables HTTPS
   - Redirect HTTP to HTTPS in production

4. **Add CORS Protection**
   - Update API routes to validate origin
   - Only allow requests from your domain

5. **Environment Variables**
   - Never commit `.env.local` to git
   - Use Vercel's secrets for sensitive data
   - Rotate secrets regularly

## 📊 Monitoring

### Vercel Analytics

1. Go to your Vercel project dashboard
2. Click "Analytics"
3. View real-time metrics:
   - Page views
   - Response times
   - Error rates

### MongoDB Atlas Monitoring

1. Go to your MongoDB cluster
2. Click "Monitoring"
3. View metrics:
   - Operations per second
   - Memory usage
   - Disk usage

## 🚨 Troubleshooting Deployment

### Build Fails: "Cannot find module"

```bash
npm install
npm run build
```

Check logs in Vercel dashboard for specific errors.

### MongoDB Connection Timeout

- Verify connection string in Vercel environment
- Check MongoDB Atlas IP whitelist
- Ensure database user exists and password is correct

### Application crashes after deployment

1. Check Vercel logs: Go to Vercel Dashboard → Deployments → View Logs
2. Common issues:
   - Missing environment variables
   - Database connection string incorrect
   - API route errors

## 📈 Scaling

### As your app grows:

1. **Database scaling** (MongoDB Atlas):
   - Upgrade from M0 (free) to M2+ (paid)
   - Enable sharding for large datasets

2. **Application scaling** (Vercel):
   - Automatically scales with traffic
   - Monitor Performance Tab
   - Add more functions if needed

3. **CDN and caching**:
   - Vercel includes CDN by default
   - Configure cache headers in `next.config.js`

4. **Image optimization**:
   - Use Next.js Image component
   - Vercel auto-optimizes images

## 📞 Deployment Support

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Your app is now live! 🎉**
