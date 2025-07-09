import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "./router/router";
import { uploadRoute } from "./router/uploadRoute";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const ORIGIN = process.env.CLIENT_ORIGIN;

const app = express();
app.use(cors({ origin: ORIGIN }));
const PORT = process.env.PORT!;

app.use("/", uploadRoute);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => ({}),
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
