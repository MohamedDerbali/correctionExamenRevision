const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String, default: "examen123" },
    email: { type: String },
}, { timestamps: true });
module.exports = mongoose.model("User", userSchema);