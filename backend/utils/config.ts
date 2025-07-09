import dotenv from "dotenv";
dotenv.config();

export const config = {
  GEMINI_URL: process.env.GEMINI_URL!,
  GEMINI_AUTH_TOKEN: process.env.GEMINI_AUTH_TOKEN!,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY!,
  PORT: process.env.PORT!,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN!,
};