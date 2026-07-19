import { CATEGORIES } from "../data";
import Groq from "groq-sdk";

export interface SheetRow {
  name: string;
  url: string;
  description: string;
}

interface ProcessedTool extends SheetRow {
  tags: string[];
  isPremium: boolean;
}


async function getTagsBatch(tools: SheetRow[]): Promise<any> {
  if (tools.length === 0)
    return { success: false, message: "No tools provided", data: [] };

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const prompt = `
    You are an AI categorization and filtering assistant. For each item in the given list, your task is to:
    1. modify the existing name, or generate a new clean name for the item (tool/website). by identifying other details of item. it should be short like a name
    2. assign relevant tags based on other details of that item. max 5 tags
    3. remove unwanted things(icons, emojis, etc.) from the description. and make it short like a description of tool. and make sure it is in english language only. if not, translate it to english
    
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
      // model: "openai/gpt-oss-120b",
      model: "llama-3.3-70b-versatile",
      // model: "llama-3.1-8b-instant",
    });
  }

  const model = await getGroqChatCompletion();

  try {
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
