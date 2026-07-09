import { NextRequest, NextResponse } from "next/server";
import { isAdmin, unauthorizedResponse } from "@/lib/admin/admin-auth";
import { connectDB } from "@/lib/db";
import WebModel from "@/models/Website";

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return unauthorizedResponse();

  try {
    const { tools } = await request.json();
    if (!Array.isArray(tools)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    await connectDB();

    // Using insertMany with ordered: false to skip duplicates
    const results = await WebModel.insertMany(tools, { ordered: false });

    return NextResponse.json({
      message: `Successfully inserted ${results.length} tools`,
      count: results.length,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      // Some were duplicates, but some might have been inserted
      return NextResponse.json({
        message: "Insertion completed. Some duplicates skipped.",
        details: error.message,
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
