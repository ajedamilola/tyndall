import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const safetySettings = [
  // {
  //   category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
  //   threshold: HarmBlockThreshold.BLOCK_NONE
  // },
  // {
  //   category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  //   threshold: HarmBlockThreshold.BLOCK_NONE
  // },
  // {
  //   category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
  //   threshold: HarmBlockThreshold.BLOCK_NONE
  // },
  // {
  //   category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
  //   threshold: HarmBlockThreshold.BLOCK_NONE
  // },
  // {
  //   category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
  //   threshold: HarmBlockThreshold.BLOCK_NONE
  // },
]
const flash = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings,
})

const pro = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  safetySettings,
})

export function trimResponse(raw) {
  let rawText = raw;
  if (rawText.includes("```json")) {
    const start = rawText.indexOf("```json")
    const end = rawText.lastIndexOf("```")
    rawText = rawText.substring(start + 8, end);
  }
  return rawText;
}

export const model = { flash, pro }