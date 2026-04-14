import mongoose from 'mongoose';

const savedCravingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cravingId: {
      type: Number,
      required: true,
    },
    cravingName: String,
    emoji: String,
  },
  { timestamps: true }
);

export default mongoose.models.SavedCraving ||
  mongoose.model('SavedCraving', savedCravingSchema);
