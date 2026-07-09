import { NextResponse, NextRequest } from "next/server";
import { isAdmin, unauthorizedResponse } from "@/lib/admin/admin-auth";
import { connectDB } from "@/lib/db";
import WebModel from "@/models/Website";

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return unauthorizedResponse();

  try {
    const data = await request.json();
    await connectDB();

    const newTool = await WebModel.create({
      name: data.name,
      url: data.url,
      description: data.description,
      tags: data.tags,
      isPremium: data.isPremium,
    });
    return NextResponse.json(newTool, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) return unauthorizedResponse();

  try {
    const { _id, ...updates } = await request.json();
    if (!_id) {
      return NextResponse.json(
        { error: "Tool _id is required" },
        { status: 400 },
      );
    }

    await connectDB();

    const updatedTool = await WebModel.findByIdAndUpdate(
      _id,
      {
        ...updates,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true },
    );

    if (!updatedTool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTool, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return unauthorizedResponse();
  try {
    const { _id } = await request.json();
    if (!_id) {
      return NextResponse.json(
        { error: "Tool _id is required" },
        { status: 400 },
      );
    }
    await connectDB();
    const deletedTool = await WebModel.findByIdAndDelete(_id);
    if (!deletedTool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }
    return NextResponse.json(deletedTool, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
