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


// import { VertexAI } from '@google-cloud/vertexai';
// import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible';

// process.env.GOOGLE_APPLICATION_CREDENTIALS = './service-account-key.json';

// const vertexAI = new VertexAI({
//   project: 'excellent-sunup-465310-d5',
//   location: 'us-central1',
// });

// const minuteLimiter = new RateLimiterMemory({
//   points: 20,          
//   duration: 60,        
// });

// const hourLimiter = new RateLimiterMemory({
//   points: 300,         
//   duration: 60 * 60,   
// });

// export async function callGeminiAPI(jdText: string, cvText: string) {
//   try {
//     await minuteLimiter.consume('global');
//     await hourLimiter.consume('global');

//     const model = vertexAI.getGenerativeModel({
//       model: 'gemini-2.5-pro',
//       generationConfig: {
//         maxOutputTokens: 256, 
//         temperature: 0.5,     
//         topP: 0.8,
//       },
//     });

//     const request = {
//       contents: [
//         {
//           role: 'user',
//           parts: [
//             {
//               text: `Compare the following job description and CV. Highlight strengths, weaknesses, and overall fit.\n\nJob Description:\n${jdText}\n\nCV:\n${cvText}`,
//             },
//           ],
//         },
//       ],
//     };

//     const response = await model.generateContent(request);
//     const text = response.response?.candidates?.[0]?.content?.parts?.[0]?.text;
//     return text || "No response from Gemini.";
//   } catch (err: any) {
//     // Specific handling for rate limit exceeded
//     if (err instanceof RateLimiterRes && err.msBeforeNext) {
//       throw new Error(`Rate limit exceeded. Try again in ${Math.ceil(err.msBeforeNext / 1000)} seconds.`);
//     }

//     throw err;
//   }
// }
