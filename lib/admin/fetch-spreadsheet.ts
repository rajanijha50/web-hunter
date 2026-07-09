
interface FetchSheetDataParams {
  sheetId: string;
  range: string;
  startingLetter?: string;
}

export async function fetchSheetData({
  sheetId,
  range,
  startingLetter,
}: FetchSheetDataParams): Promise<any> {
  //   //console.log("sheet id: ", sheetId)
  //   //console.log("range: ", range)

  if (!range) {
    return {
      success: false,
      message: "Range is required to fetch data from Google Sheets",
      data: [],
    };
  }
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId || process.env.GOOGLE_SHEET_ID}/values/${range}?key=${process.env.GOOGLE_PRIVATE_KEY}`;

  //console.log("sheet url: ", url);

  try {
    const response = await fetch(url);
    const result = await response.json();

    if (result.error) {
      //   console.error("API Error:", result.error, url);
      return {
        success: false,
        message:
          result.error?.message || "Failed to fetch data from Google Sheets",
        data: [],
      };
    }

    const rows = result.values;
    if (!rows || rows.length <= 1) {
      // Skip empty or only-header sheets
      console.log("No valid data found in the spreadsheet.");
      return {
        success: false,
        message: "No valid data found in the spreadsheet.",
        data: [],
      };
    }

    // Skip the first row (headers)
    const dataRows = rows.slice(1);
    //console.log("data rows", dataRows.slice(0, 5));

    const invalidMarkers = ["#REF!", "#N/A", "Loading..."];

    const formattedData = dataRows.map((row: any) => ({
      name: (row[0] || "").toString().trim(),
      url: (row[1] || "").toString().trim(),
      description: (row[2] || "").toString().trim(),
    }));

    //console.log("formatted Data: ", formattedData.slice(0, 5));

    const filteredData = formattedData.filter((item: any) => {
      // 1. Basic presence check
      if (!item.name || !item.url || !item.description) return false;

      // 2. Check for error markers in any field
      const hasError = Object.values(item).some((val: any) =>
        invalidMarkers.some((marker: string) => val == marker),
      );
      if (hasError) return false;

      // 3. Filter by starting letter if provided
      if (startingLetter && startingLetter.trim().length === 1) {
        if (!item.name.toLowerCase().startsWith(startingLetter.toLowerCase())) {
          return false;
        }
      }

      return true; // Keep the item
    });

    //console.log("filtered Data", filteredData.slice(0, 5));

    return {
      success: true,
      message: "Data fetched successfully",
      data: filteredData,
    };
  } catch (error: any) {
    console.error("Error fetching sheet data:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch data from Google Sheets",
      data: [],
    };
  }
}
