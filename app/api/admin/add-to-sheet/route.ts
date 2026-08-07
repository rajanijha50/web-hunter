import { NextRequest, NextResponse } from "next/server";
import { isAdmin, unauthorizedResponse } from "@/lib/admin/admin-auth";
import { addSheetData } from "@/lib/admin/add-spreadsheet";

export async function POST(request: NextRequest) {
    if (!(await isAdmin())) return unauthorizedResponse();
    try {
        const { url, sheetId } = await request.json();
        console.log("data in admin api add-to-sheet route: ", url, sheetId)
        if (!url || url.length === 0) {
            return NextResponse.json(
                { error: "Url is required to add to sheet", data: [] },
                { status: 400 },
            );
        }

        const result = await addSheetData({ sheetId, url })
        console.log("result from add-to-sheet: ", result)

        if (!result.success) {
            return NextResponse.json(
                { error: result.message, data: [] },
                { status: 500 },
            );
        }

        return NextResponse.json(
            { data: result.data, message: result.message },
            { status: 200 },
        );
    } catch (error: any) {
        console.error("error in bulk-import route: ", error);
        return NextResponse.json(
            { error: error.message, data: [] },
            { status: 500 },
        );
    }
}