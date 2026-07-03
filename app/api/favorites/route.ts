import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import FavoriteModel from "@/models/Favorite";
import WebsiteModel from "@/models/Website";

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const user_id = searchParams.get("user_id");
  try {
    await connectDB();
    const favorites = await FavoriteModel.find({ user_id: user_id }).populate("website_id");
    return NextResponse.json(
      { data: favorites, message: "Favorites fetched successfully" },
      { status: 200 },
    ); 
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { user_id, website_id } = await request.json();
  try {
    await connectDB();
    const existing = await FavoriteModel.findOne({ user_id, website_id });
    if (existing) {
      await FavoriteModel.deleteOne({ user_id, website_id });
      await WebsiteModel.findByIdAndUpdate(website_id, {
        $inc: { likesCount: -1 },
      });
      return NextResponse.json(
        { message: "Removed", liked: false },
        { status: 200 },
      );
    } else {
      await FavoriteModel.create({ user_id, website_id });
      await WebsiteModel.findByIdAndUpdate(website_id, {
        $inc: { likesCount: 1 },
      });
      return NextResponse.json(
        { message: "Added", liked: true },
        { status: 200 },
      );
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

