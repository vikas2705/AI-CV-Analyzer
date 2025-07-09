import express, { RequestHandler } from "express";
import { upload } from "../utils/upload";
import { extractTextFromPDF } from "../utils/extractPDFText";
import { appRouter } from "../router/router";

export const uploadRoute = express.Router();

const handleUpload: RequestHandler = async (req, res) => {
  const files = req.files as {
    cv?: Express.Multer.File[];
    jd?: Express.Multer.File[];
  };

  if (!files.cv || !files.jd) {
    res.status(400).json({ error: "Both CV and JD PDF files are required." });
    return;
  }

  try {
    const jdText = await extractTextFromPDF(files.jd[0].buffer);
    const cvText = await extractTextFromPDF(files.cv[0].buffer);

    const result = await appRouter.createCaller({}).analyzeCV({ jdText, cvText });

    res.json({ result }); 
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Something went wrong while analyzing PDFs." });
  }
};

uploadRoute.post(
  "/upload",
  upload.fields([
    { name: "cv", maxCount: 1 },
    { name: "jd", maxCount: 1 },
  ]),
  handleUpload
);
