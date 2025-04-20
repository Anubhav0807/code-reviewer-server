const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
  title: String,
  content: String,
  language: String,
  createdAt: { type: Date, default: Date.now },
});

const Code = mongoose.model("Code", codeSchema);
module.exports = Code;