import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import WebModel from "@/models/Website";

export async function GET() {
  try {
    await connectDB();
    const websites = await WebModel.find({}).sort({ createdAt: -1 });
    // console.log(websites);
    return NextResponse.json(
      {
        success: true,
        count: websites.length,
        data: websites,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error fetching websites:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
