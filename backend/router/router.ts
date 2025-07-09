import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { callGeminiAPI } from "../utils/gemini";

const t = initTRPC.create();

export const appRouter = t.router({
  analyzeCV: t.procedure
    .input(
      z.object({
        jdText: z.string(),
        cvText: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const result = await callGeminiAPI(input.jdText, input.cvText);
      return { result };
    }),
});

export type AppRouter = typeof appRouter;
