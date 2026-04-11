import express from "express";
import multer from "multer";

import { loadServerEnv } from "./env.mjs";
import { convertHeicBuffer, isHeicLikeFile } from "./heic-conversion.mjs";

loadServerEnv();

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});

app.get("/api/convert/heic", (_req, res) => {
  res.json({
    ok: true,
    endpoint: "/api/convert/heic",
    accepted_formats: ["jpeg", "png", "webp", "pdf"],
  });
});

app.post("/api/convert/heic", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const targetFormat = String(req.body?.target_format || "").toLowerCase();

    if (!file) {
      res.status(400).json({ error: "Missing file upload." });
      return;
    }

    if (!isHeicLikeFile({ filename: file.originalname, mimeType: file.mimetype })) {
      res.status(400).json({ error: "Only HEIC/HEIF uploads are supported." });
      return;
    }

    const converted = await convertHeicBuffer({
      inputBuffer: file.buffer,
      targetFormat,
      filename: file.originalname,
    });

    res.setHeader("Content-Type", converted.contentType);
    res.setHeader("Content-Disposition", `inline; filename="${converted.filename}"`);
    res.setHeader("X-Converted-Filename", converted.filename);
    res.status(200).send(converted.buffer);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "HEIC conversion failed.";
    const status = message.includes("Unsupported target format") ? 400 : 500;
    res.status(status).json({ error: message });
  }
});

const port = Number(process.env.HEIC_API_PORT || 8788);

app.listen(port, () => {
  console.log(`HEIC conversion API listening on http://127.0.0.1:${port}`);
});
