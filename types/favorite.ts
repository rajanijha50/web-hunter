import { Types } from "mongoose";

export interface FavoriteType {
    _id: Types.ObjectId;
    user_id: Types.ObjectId;
    website_id: Types.ObjectId;
    createdAt: Date;
}
