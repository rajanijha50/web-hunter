import { google } from "googleapis";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connectDB } from "./db";
import WebModel from "../models/Website";
import { CATEGORIES } from "./data";
import { fetchSheetData } from "./fetch-spreadsheet";
import Groq from "groq-sdk";

// Environment variables (User will add these to .env)
// const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
// const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || "";

// // Robust Private Key parsing to handle escaped newlines and accidental quotes from .env
// const PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || "")
//   .replace(/\\n/g, "\n") // Handle escaped \n
//   .replace(/^"(.*)"$/, "$1") // Remove surrounding double quotes
//   .replace(/^'(.*)'$/, "$1") // Remove surrounding single quotes
//   .trim();

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

/**
 * Interface for the row data from Google Sheets
 */
export interface SheetRow {
  name: string;
  url: string;
  description: string;
}

/**
 * Interface for the processed data with tags
 */
interface ProcessedTool extends SheetRow {
  tags: string[];
  isPremium: boolean;
}

/**
 * Initialize Google Sheets API client
 */
// async function getSheetsClient() {
//   const auth = new google.auth.JWT({
//     email: CLIENT_EMAIL,
//     key: PRIVATE_KEY,
//     scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
//   });
//   return google.sheets({ version: "v4", auth });
// }

/**
 * Get tags for a batch of tools using AI
 */
async function getTagsBatch(tools: SheetRow[]): Promise<any> {
  if (tools.length === 0)
    return { success: false, message: "No tools provided", data: [] };

  // const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  // const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `
    You are an AI categorization assistant. Your task is to:
    1. modify(clean the unwanted text like "[]" , "-", ".", "|", etc.) existing name, or generate a new clean name for the item (tool/website). using other properties of item.
    2. assign relevant tags
    to each website/tool from the provided list.
    
    Allowed Categories (Use ONLY these tags):
    [${CATEGORIES.join(", ")}]

    Input Tools:
    ${tools.map((t, i) => `${i + 1}. Name: ${t.name}, Description: ${t.description}`).join("\n")}

    Return ONLY a JSON array where each element is an object of name and tags. where array of strings representing the tags for the corresponding tool. No explanation how you did it. No anything else. just give the json array output.
    Example JSON Output:
    {[
      { name: "AI Tools", tags: ["AI Tools", "Productivity"] },
      { name: "Design", tags: ["Design", "UI"] },
      { name: "AI Writing", tags: ["AI Writing", "Education"] }
    ]}
  `;

  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-120b",
      // model: "llama-3.1-8b-instant",
    });
  }

  const model = await getGroqChatCompletion();

  try {
    // const result = await model.generateContent(prompt);
    // const text = result.response.text();
    // const text = result.choices[0].message.content;
    const text = model.choices[0]?.message?.content || "";
    const jsonString = text.replace(/```json|```/g, "").trim();
    console.log("jsonstring: ", jsonString);

    const cleanedList = JSON.parse(jsonString);
    // console.log('cleanedList', cleanedList.length)
    return {
      success: true,
      message: "Tags fetched successfully",
      data: cleanedList,
    };
  } catch (error: any) {
    console.error("AI Tagging Error:", error);
    return {
      success: false,
      message: error?.message || "Failed to fetch tags",
      data: [],
    };
  }
}

/**
 * Fetch and process data from Google Spreadsheet for preview
 */
export async function getBulkPreview(
  data: any[],
  batchSize = 10,
): Promise<any> {
  const validRows = data;

  if (validRows.length === 0)
    return { success: false, message: "No data found", data: [] };
  // console.log('validRows', validRows.length)
  const processedTools: ProcessedTool[] = [];

  // Process in batches for AI tagging
  for (let i = 0; i < validRows.length; i += batchSize) {
    const batch = validRows.slice(i, i + batchSize);
    console.log(
      `Analyzing batch ${Math.floor(i / batchSize) + 1} (${batch.length} items)...`,
    );

    const { success, message, data: cleanedList } = await getTagsBatch(batch);
    if (!success) {
      console.error("Failed to fetch tags:", message);
      return { success: false, message, data: [] };
    }

    batch.forEach((tool, index) => {
      processedTools.push({
        // ...tool,
        name: cleanedList[index].name,
        url: tool.url,
        description: tool.description,
        tags: cleanedList[index].tags || [],
        isPremium: false,
      });
    });
  }

  return {
    success: true,
    message: "Data processed successfully",
    data: processedTools,
  };
}

/**
 * Main bulk insert function
 */
// export async function bulkInsertTools(tools: ProcessedTool[]) {
//   try {
//     await connectDB();
//     if (tools.length === 0) return { success: true, count: 0 };

//     // Insert into MongoDB with unique URL protection
//     const results = await WebModel.insertMany(tools, { ordered: false });
//     return { success: true, count: results.length };
//   } catch (error: any) {
//     if (error.code === 11000) {
//       return { success: true, message: "Partial success, duplicates skipped" };
//     }
//     throw error;
//   }
// }
