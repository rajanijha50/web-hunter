import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import UserOldModel from "@/models/UserOld";

export async function GET() {
    try {
        await connectDB();
        const users = await UserOldModel.find({}).sort({ createdAt: -1 });
        console.log(users);
        return NextResponse.json({
            success: true,
            count: users.length,
            data: users
        }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching users:", error);
        return NextResponse.json({
            success: false,
            message: "Server Error",
            error: error.message
        }, { status: 500 });
    }
}