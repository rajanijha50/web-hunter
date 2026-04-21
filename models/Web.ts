import mongoose, { Schema, model, models } from "mongoose";

const WebSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Website name is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Website URL is required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    tags: {
      type: Array,
      required: [true, "Tags are required"],
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // rating: {
    //   type: Number,
    //   default: 0,
    // },
    // priceType: {
    //   type: String,
    //   default: "Free",
    // },
  },
  // {
  //   timestamps: true,
  // }
);

// Add index for search
WebSchema.index({ name: "text", description: "text", tags: "text" });

const WebModel = models.website || model("website", WebSchema);

export default WebModel;
