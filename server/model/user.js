// user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        chatId: { type: String, required: true, unique: true },
        walletAddress: { type: String, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
