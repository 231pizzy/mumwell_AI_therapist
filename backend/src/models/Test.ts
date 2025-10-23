import mongoose, { Schema, Document } from "mongoose";

export interface ITEST extends Document {
  userId: mongoose.Types.ObjectId;
  score: number;
  level?: string;
  message?: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

const testSchema = new Schema<ITEST>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 30,
    },
    level: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying of user's mood history
testSchema.index({ userId: 1, timestamp: -1 });

const Test = mongoose.model<ITEST>("test", testSchema);

export { Test };