import { getGoogleAccessToken } from "@/lib/admin/google-sheet-auth";

interface AddSheetDataParams {
    sheetId?: string;
    url: string;
}

export async function addSheetData({
    sheetId,
    url,
}: AddSheetDataParams) {
    const spreadsheetId = sheetId || process.env.GOOGLE_SHEET_ID_WRITE || process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
        return {
            success: false,
            message: "Spreadsheet ID is missing.",
        };
    }

    try {
        const accessToken = await getGoogleAccessToken();

        // Step 1: Read existing URLs from Column A
        const readResponse = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A:A`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const readResult = await readResponse.json();

        if (readResult.error) {
            console.error("error in admin lib add-spreadsheet.ts: ", readResult.error);
            return {
                success: false,
                message: readResult.error.message || "Failed to read Google Sheet.",
            };
        }

        // Extract column A values and normalize
        const rows: string[][] = readResult.values || [];
        const existingUrls = rows
            .map((row: string[]) => (row[0] || "").trim().toLowerCase());

        const normalizedUrl = url.trim().toLowerCase();

        // Step 2: Check for duplicate
        if (existingUrls.includes(normalizedUrl)) {
            console.log("data in admin lib add-spreadsheet.ts: url already exists");
            return {
                success: true,
                message: "URL already exists.",
            };
        }

        // Step 3: Append URL to column A (A1:append targets first empty row)
        const appendResponse = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    values: [[url]],
                }),
            }
        );

        const appendResult = await appendResponse.json();

        if (appendResult.error) {
            console.error("error in admin lib add-spreadsheet.ts: ", appendResult.error);
            return {
                success: false,
                message: appendResult.error.message || "Failed to append to Google Sheet.",
            };
        }

        console.log("data in admin lib add-spreadsheet.ts: url added successfully", appendResult);
        return {
            success: true,
            message: "URL added successfully.",
            data: appendResult,
        };
    } catch (error: any) {
        console.error("error in admin lib add-spreadsheet.ts: ", error);
        return {
            success: false,
            message: error.message || "Failed to add in Google Sheet.",
        };
    }
}