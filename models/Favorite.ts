import { Schema, model, models, Types } from "mongoose";
import { FavoriteType } from "@/types/favorite";

const FavoriteSchema = new Schema<FavoriteType>({
  user_id: {
    type: Types.ObjectId,
    ref: "user",
    required: true,
  },
  website_id: {
    type: Types.ObjectId,
    ref: "website",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FavoriteSchema.index({ user_id: 1, website_id: 1 }, { unique: true })

const FavoriteModel = models.favorite || model("favorite", FavoriteSchema);

export default FavoriteModel;
