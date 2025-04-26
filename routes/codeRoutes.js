const express = require("express");
const dotenv = require("dotenv");
const Code = require("../models/code"); // Import Code model
const router = express.Router();

dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// ✅ Get all saved codes
router.get("/", async (req, res) => {
  try {
    const codes = await Code.find();
    res.json(codes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Save new code
router.post("/", async (req, res) => {
  try {
    const { title, content, language } = req.body;
    const newCode = new Code({ title, content, language });
    await newCode.save();
    res.status(201).json({ message: "Code saved successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Send the prompt and file contents to AI and get the respone
router.post("/prompt_ai", async (req, res) => {
  try {
    const { title, content, language, prompt } = req.body;
    const response = (
      await model.generateContent(
        `Filename: ${title}\n Language: ${language}\n${content}\n\n${prompt}`
      )
    ).response;
    const output = response.candidates[0].content.parts[0].text;

    // Extracting code and explanation from the AI output
    const idx1 = output.indexOf('```');
    const idx2 = output.indexOf('```', idx1 + 3);
    const code = output.slice(idx1+3, idx2).replace(language, '');
    const explanation = output.slice(idx2+3, output.length);
    
    res.json({ code: code, explanation: explanation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
