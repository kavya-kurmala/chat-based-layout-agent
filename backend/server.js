import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "20mb" }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, layoutJson } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key missing" });
    }

    if (!message || !layoutJson) {
      return res.status(400).json({ error: "Message and layoutJson are required" });
    }

    const prompt = `
You are a layout JSON editor.

Return ONLY valid JSON.
No markdown.
No explanation.

User instruction: ${message}

Current JSON:
${JSON.stringify(layoutJson)}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const first = text.indexOf("{");
    const last = text.lastIndexOf("}");

    if (first !== -1 && last !== -1) {
      text = text.substring(first, last + 1);
    }

    const updatedJson = JSON.parse(text);

    res.json({ updatedJson });
  } catch (error) {
    console.error("BACKEND ERROR:", error.message);
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend running on port ${process.env.PORT || 5000}`);
});
