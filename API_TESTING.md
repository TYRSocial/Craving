# 🧪 API Testing Guide

## Base URL
```
http://localhost:3000
```

## 📝 Test Credentials

### Account 1
- **Email**: john@example.com
- **Password**: password123
- **Role**: Regular User

### Account 2
- **Email**: shop@example.com
- **Password**: shop123
- **Role**: Shop Owner

---

## 🔐 Authentication Endpoints

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  }
}
```

---

### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer {token}
```

**Response** (200):
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://example.com/avatar.jpg",
    "isShopOwner": false
  }
}
```

---

## 📝 Post Endpoints

### Get All Posts (Public)
```bash
GET /api/posts
```

**Response** (200):
```json
{
  "posts": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "title": "Amazing Pizza!",
      "description": "Best pizza I've ever had",
      "imageUrl": "https://via.placeholder.com/600x400?text=Pizza",
      "cravingCategory": "Fast Food",
      "mood": "happy",
      "visibility": "public",
      "likes": [
        {
          "userId": "507f1f77bcf86cd799439013",
          "likedAt": "2026-04-14T10:30:00.000Z"
        }
      ],
      "comments": [
        {
          "userId": "507f1f77bcf86cd799439013",
          "userName": "Jane Doe",
          "text": "Looks delicious!",
          "createdAt": "2026-04-14T10:40:00.000Z"
        }
      ],
      "likeCount": 1,
      "commentCount": 1,
      "createdAt": "2026-04-14T10:00:00.000Z",
      "updatedAt": "2026-04-14T10:40:00.000Z"
    }
  ]
}
```

---

### Create Post
```bash
POST /api/posts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Amazing Pizza!",
  "description": "Best pizza I've ever had",
  "imageUrl": "https://via.placeholder.com/600x400?text=Pizza",
  "cravingCategory": "Fast Food",
  "mood": "happy",
  "visibility": "public"
}
```

**Response** (201):
```json
{
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "title": "Amazing Pizza!",
    "description": "Best pizza I've ever had",
    "imageUrl": "https://via.placeholder.com/600x400?text=Pizza",
    "cravingCategory": "Fast Food",
    "mood": "happy",
    "visibility": "public",
    "likes": [],
    "comments": [],
    "likeCount": 0,
    "commentCount": 0,
    "createdAt": "2026-04-14T10:00:00.000Z",
    "updatedAt": "2026-04-14T10:00:00.000Z"
  }
}
```

---

### Toggle Like on Post
```bash
POST /api/posts/{postId}/like
Authorization: Bearer {token}
```

**Response** (200):
```json
{
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Amazing Pizza!",
    "likes": [
      {
        "userId": "507f1f77bcf86cd799439011",
        "likedAt": "2026-04-14T10:30:00.000Z"
      }
    ],
    "likeCount": 1,
    "commentCount": 0
  }
}
```

---

### Add Comment to Post
```bash
POST /api/posts/{postId}/comment
Authorization: Bearer {token}
Content-Type: application/json

{
  "text": "This looks delicious!"
}
```

**Response** (200):
```json
{
  "post": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Amazing Pizza!",
    "comments": [
      {
        "userId": "507f1f77bcf86cd799439011",
        "userName": "John Doe",
        "userAvatar": null,
        "text": "This looks delicious!",
        "createdAt": "2026-04-14T10:40:00.000Z"
      }
    ],
    "likeCount": 1,
    "commentCount": 1
  }
}
```

---

## 🏪 Shop Endpoints

### Get All Shops
```bash
GET /api/shops
```

**Response** (200):
```json
{
  "shops": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "ownerId": {
        "_id": "507f1f77bcf86cd799439019",
        "name": "Pizza Master",
        "email": "pizza@example.com"
      },
      "shopName": "Pizza Master's Kitchen",
      "description": "Best pizzas in town",
      "address": "123 Main St, Pizza City",
      "phone": "+1-555-0123",
      "email": "pizza@example.com",
      "foodItems": [
        {
          "name": "Margherita Pizza",
          "price": 12.99,
          "cravingCategory": "Fast Food",
          "imageUrl": "https://via.placeholder.com/400x300?text=Margherita",
          "description": "Classic pizza with mozzarella and tomato"
        }
      ],
      "rating": 4.8,
      "reviews": [
        {
          "userId": "507f1f77bcf86cd799439011",
          "rating": 5,
          "text": "Amazing pizza!",
          "createdAt": "2026-04-14T09:00:00.000Z"
        }
      ],
      "location": {
        "type": "Point",
        "coordinates": [-74.006, 40.7128]
      },
      "createdAt": "2026-04-14T08:00:00.000Z"
    }
  ]
}
```

---

### Create Shop
```bash
POST /api/shops
Authorization: Bearer {token}
Content-Type: application/json

{
  "shopName": "Pizza Master's Kitchen",
  "description": "Best pizzas in town",
  "address": "123 Main St, Pizza City",
  "phone": "+1-555-0123",
  "email": "pizza@example.com",
  "foodItems": []
}
```

---

### Get Nearby Shops
```bash
GET /api/shops/nearby?latitude=40.7128&longitude=-74.006&maxDistance=5000&craving=Fast%20Food
```

**Parameters**:
- `latitude` (required): User's latitude
- `longitude` (required): User's longitude
- `maxDistance` (optional): Max distance in meters (default: 5000)
- `craving` (optional): Filter by craving category

**Response** (200):
```json
{
  "shops": [
    {
      "_id": "507f1f77bcf86cd799439020",
      "shopName": "Pizza Master's Kitchen",
      "address": "123 Main St, Pizza City",
      "phone": "+1-555-0123",
      "foodItems": [
        {
          "name": "Margherita Pizza",
          "price": 12.99,
          "cravingCategory": "Fast Food"
        }
      ],
      "rating": 4.8,
      "distance": 0.5,
      "location": {
        "type": "Point",
        "coordinates": [-74.006, 40.7128]
      }
    }
  ]
}
```

---

### Update Shop
```bash
PUT /api/shops/{shopId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "foodItems": [
    {
      "name": "Margherita Pizza",
      "price": 12.99,
      "cravingCategory": "Fast Food",
      "imageUrl": "https://via.placeholder.com/400x300?text=Margherita",
      "description": "Classic pizza"
    },
    {
      "name": "Pepperoni Pizza",
      "price": 14.99,
      "cravingCategory": "Spicy",
      "imageUrl": "https://via.placeholder.com/400x300?text=Pepperoni",
      "description": "Spicy pizza"
    }
  ]
}
```

---

## 🎯 Craving Endpoints

### Get All Cravings
```bash
GET /api/cravings
```

**Response** (200):
```json
{
  "cravings": [
    { "id": 1, "name": "Sweet", "emoji": "🍰" },
    { "id": 2, "name": "Spicy", "emoji": "🌶️" },
    { "id": 3, "name": "Fast Food", "emoji": "🍔" },
    { "id": 4, "name": "Healthy", "emoji": "🥗" },
    { "id": 5, "name": "Seafood", "emoji": "🦞" },
    { "id": 6, "name": "Chinese", "emoji": "🥡" },
    { "id": 7, "name": "Italian", "emoji": "🍝" },
    { "id": 8, "name": "Indian", "emoji": "🍛" }
  ]
}
```

---

### Get My Saved Cravings
```bash
GET /api/cravings/my-cravings
Authorization: Bearer {token}
```

**Response** (200):
```json
{
  "myCravings": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "userId": "507f1f77bcf86cd799439011",
      "cravingId": 1,
      "cravingName": "Sweet",
      "savedAt": "2026-04-14T10:00:00.000Z"
    }
  ]
}
```

---

### Save a Craving
```bash
POST /api/cravings
Authorization: Bearer {token}
Content-Type: application/json

{
  "cravingId": 1,
  "cravingName": "Sweet"
}
```

**Response** (201):
```json
{
  "savedCraving": {
    "_id": "507f1f77bcf86cd799439030",
    "userId": "507f1f77bcf86cd799439011",
    "cravingId": 1,
    "cravingName": "Sweet",
    "savedAt": "2026-04-14T10:00:00.000Z"
  }
}
```

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Posts
```bash
curl http://localhost:3000/api/posts
```

### Create Post (with token)
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Post",
    "description": "This is a test",
    "imageUrl": "https://via.placeholder.com/600x400?text=Test",
    "cravingCategory": "Fast Food",
    "mood": "happy",
    "visibility": "public"
  }'
```

---

## 🧪 Testing with Postman

1. **Create a new collection** named "A Craving API"

2. **Environment variables**:
   ```json
   {
     "base_url": "http://localhost:3000",
     "token": ""
   }
   ```

3. **Add requests**:
   - Register (POST) - captures token from response
   - Login (POST) - captures token from response
   - Get Posts (GET)
   - Create Post (POST) - uses {{token}}
   - Like Post (POST)
   - Comment on Post (POST)
   - Get Nearby Shops (GET)

---

## ✅ Test Checklist

- [ ] Register new account
- [ ] Login with credentials
- [ ] Get current user info
- [ ] Create a post with mood
- [ ] Get all posts
- [ ] Like a post
- [ ] Unlike a post
- [ ] Comment on a post
- [ ] Get all cravings
- [ ] Save a craving
- [ ] Get my saved cravings
- [ ] Create a shop
- [ ] Get all shops
- [ ] Get nearby shops with location
- [ ] Update shop with food items

---

## 📊 Error Responses

### 400 Bad Request
```json
{
  "error": "Please provide required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "error": "Post not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error message"
}
```

---

## 🔗 Useful URLs

| Feature | URL |
|---------|-----|
| Home | http://localhost:3000 |
| Register | http://localhost:3000/register |
| Login | http://localhost:3000/login |
| Dashboard | http://localhost:3000/dashboard |
| Create Post | http://localhost:3000/create-post |
| Feed | http://localhost:3000/feed |
| Mood Recommendations | http://localhost:3000/mood-recommendations |
| Nearby Restaurants | http://localhost:3000/nearby-restaurants |
| Craving Demo | http://localhost:3000/craving-demo |
| My Cravings | http://localhost:3000/cravings |
| Shop | http://localhost:3000/shop |

---

## 🐛 Common Issues

### "Token Expired"
- Token is only valid for 1 hour
- Login again to get a new token

### "Post Not Found"
- Check that the postId is correct
- Make sure the post exists in MongoDB

### "Unauthorized"
- Token is missing or invalid
- Include `Authorization: Bearer {token}` header

### "MongoDB Connection Error"
- Make sure MongoDB is running
- Check MONGODB_URI in .env.local

---

Happy testing! 🎉
