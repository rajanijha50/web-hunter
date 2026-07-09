import { NextRequest, NextResponse } from "next/server";
import { isAdmin, unauthorizedResponse } from "@/lib/admin/admin-auth";
import { getBulkPreview } from "@/lib/admin/bulk-import";
import { fetchSheetData } from "@/lib/admin/fetch-spreadsheet";

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return unauthorizedResponse();

  try {
    const { sheetId, range, batchSize, startingLetter } = await request.json();

    // console.log("params in api: ", sheetId, range, batchSize, startingLetter)
    const Sheetresult = await fetchSheetData({
      sheetId,
      range,
      startingLetter,
    });
    if (!Sheetresult.success) {
      return NextResponse.json(
        { error: Sheetresult.message, data: Sheetresult.data },
        { status: 500 },
      );
    }

    const Presult = await getBulkPreview(Sheetresult.data, batchSize);
    if (!Presult.success) {
      return NextResponse.json(
        { error: Presult.message, data: Presult.data },
        { status: 500 },
      );
    }
    console.log("sample output: ", Presult.data[0]);
    return NextResponse.json(
      { data: Presult.data, message: Presult.message },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("error in bulk-preview route: ", error);
    return NextResponse.json(
      { error: error.message, data: [] },
      { status: 500 },
    );
  }
}
