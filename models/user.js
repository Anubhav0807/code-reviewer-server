const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will store hashed password
}, { timestamps: true });

// ✅ Hash password before saving
userSchema.pre("save", function(next) {
    if (!this.isModified("password")) return next();

    this.password = crypto.createHash("sha256").update(this.password).digest("hex");
    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
