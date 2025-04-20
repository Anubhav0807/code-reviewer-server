const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const codeRoutes = require("./routes/codeRoutes");

dotenv.config();
const app = express();

// ✅ Enable CORS for all origins
app.use(cors());

// ✅ Middleware for JSON parsing
app.use(express.json());

// ✅ Use user routes
app.use("/users", userRoutes);

// ✅ Use code routes
app.use("/codes", codeRoutes);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("[Connected Successfully]"))
  .catch(() => console.log("[Failed to Connect]"));

app.listen(3000, () => console.log("Running on port 3000"));
