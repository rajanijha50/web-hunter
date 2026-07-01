import { Schema, model, models } from "mongoose";
import { WebsiteType } from "@/types/website";

const WebsiteSchema = new Schema<WebsiteType>({
  name: {
    type: String,
    required: [true, "Websitesite name is required"],
    trim: true,
    set: (value: string) => {
      if (!value) return value;
      const markers = ["|", "•", "-", ":", "-", "—"];
      let cleaned = value.trim();
      for (const marker of markers) {
        if (cleaned.includes(marker)) {
          cleaned = cleaned.split(marker)[0].trim();
          break;
        }
      }
      return cleaned;
    },
  },
  url: {
    type: String,
    required: [true, "Websitesite URL is required"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  tags: {
    type: [String],
    required: [true, "Tags are required"],
    max: 5,
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for search
WebsiteSchema.index({ name: "text", description: "text", tags: "text" });

const WebsiteModel = models.website || model("website", WebsiteSchema);

export default WebsiteModel;
