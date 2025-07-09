import dotenv from "dotenv";
dotenv.config();

import { callGeminiAPI } from "./utils/gemini";

(async () => {
  const jdText = `We are hiring a full-stack developer with strong skills in React, Node.js, and TypeScript.`;
  const cvText = `John Doe has 3 years experience in React and Node.js, and has contributed to several open source projects.`;

  try {
    const response = await callGeminiAPI(jdText, cvText);
    console.log("Gemini response:");
    console.log(response);
  } catch (error) {
    console.error("Gemini API failed:");
    console.error(error);
  }
})();
