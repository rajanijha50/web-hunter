import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: false, // Optional if using OAuth
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // savedTools: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Web",
    //   },
    // ],
  },
  // {
  //   timestamps: true,
  // }
);

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
