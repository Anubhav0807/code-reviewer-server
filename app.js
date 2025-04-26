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

// ✅ Index route
app.get("/", (req, res) => {
  res.json({
    message: "Code Reviewer API",
    version: "1.0",
    author: [
      "Adityaraj Shrivastava",
      "Anubhav Jha",
      "Archishman Debnath",
      "Mahargha Kundu"
    ],
    endpoints: {
      users: {
        "/users": {
          "GET": "Returns all users",
          "POST": "Creates a user"
        },
        "/users/:id": {
          "GET": "Get a user by ID",
          "PUT": "Update a user by ID",
          "DELETE": "Delete a user by ID"
        }
      },
      codes: {
        "/codes": {
          "GET": "Get all saved codes",
          "POST": "Save a new code"
        },
        "prompt_ai": {
          "POST": "Send the prompt and file contents to AI and get the respone"
        }
      }
    }
  });
});

// ✅ Use user routes
app.use("/users", userRoutes);

// ✅ Use code routes
app.use("/codes", codeRoutes);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("[Connected Successfully]"))
  .catch(() => console.log("[Failed to Connect]"));

app.listen(3000, () => console.log("Running on port 3000"));
