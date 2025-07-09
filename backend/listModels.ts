// listModels.ts
import { GoogleGenAI } from '@google/genai';
import { config } from './utils/config'; // Assuming you have your config.ts with GOOGLE_API_KEY

async function main() {
  const API_KEY = config.GOOGLE_API_KEY;

  if (!API_KEY) {
    console.error("Missing GOOGLE_API_KEY in environment or config.");
    process.exit(1); // Exit with an error code
  }

  // Initialize the Generative AI client with your API key
  const genAI = new GoogleGenAI({ apiKey: API_KEY });

  console.log("Fetching available Gemini models...");

  try {
    // List all models (manually specify known Gemini models as the SDK does not provide a listModels method)
    const models = [
      {
        name: "gemini-pro",
        displayName: "Gemini Pro",
        description: "General-purpose Gemini model for text generation.",
        inputTokenLimit: "N/A",
        outputTokenLimit: "N/A",
        supportedGenerationMethods: ["generateContent"]
      },
      {
        name: "gemini-pro-vision",
        displayName: "Gemini Pro Vision",
        description: "Gemini model for text and image input.",
        inputTokenLimit: "N/A",
        outputTokenLimit: "N/A",
        supportedGenerationMethods: ["generateContent"]
      }
    ];

    console.log("\nAvailable Gemini Models supporting 'generateContent':");
    let foundModels = false;
    for (const model of models) {
      // Check if the model supports the 'generateContent' method
      if (model.supportedGenerationMethods?.includes('generateContent')) {
        console.log(`  Name: ${model.name}`);
        console.log(`  Display Name: ${model.displayName || 'N/A'}`);
        console.log(`  Description: ${model.description || 'N/A'}`);
        console.log(`  Input Token Limit: ${model.inputTokenLimit || 'N/A'}`);
        console.log(`  Output Token Limit: ${model.outputTokenLimit || 'N/A'}`);
        console.log("  ---");
        foundModels = true;
      }
    }

    if (!foundModels) {
      console.log("No models found that support 'generateContent'.");
      console.log("Please ensure your API key is correct and has the necessary permissions.");
    }

  } catch (error: any) {
    console.error("Error listing models:", error?.message || error);
    if (error?.response?.data) {
      console.error("API Error Details:", JSON.stringify(error.response.data, null, 2));
    }
  }
}

main();