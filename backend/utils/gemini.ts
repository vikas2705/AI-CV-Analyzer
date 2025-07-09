import { VertexAI } from '@google-cloud/vertexai';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './service-account-key.json';

const vertexAI = new VertexAI({
  project: 'excellent-sunup-465310-d5',  
  location: 'us-central1',               
});

export async function callGeminiAPI(jdText: string, cvText: string) {
  const model = vertexAI.getGenerativeModel({
    model: 'gemini-2.5-flash', 
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.9,
    }
  });

  const request = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: `Compare the following job description and CV. Highlight strengths, weaknesses, and overall fit. Give only in 100 words with over all % number.\n\nJob Description:\n${jdText}\n\nCV:\n${cvText}`,
          },
        ],
      },
    ],
  };

  const response = await model.generateContent(request);
  const text = response.response?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "No response from Gemini.";
}
