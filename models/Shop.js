import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    description: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
    address: String,
    phone: String,
    email: String,
    foodItems: [
      {
        name: String,
        price: Number,
        cravingCategory: String,
        imageUrl: String,
        description: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

shopSchema.index({ location: '2dsphere' });

export default mongoose.models.Shop || mongoose.model('Shop', shopSchema);
