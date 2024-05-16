const mongoose = require("mongoose");

const userFileSchema = new mongoose.Schema(
    {
        walletAddress: { type: String, required: true },
        filename: { type: String, required: true },
        path: { type: String, required: true }, // URL or location path in storage
        extension: { type: String, required: true },
        size: { type: String, required: true },
    },
    { timestamps: true }
);

const UserFile = mongoose.model("UserFile", userFileSchema);
module.exports = UserFile;
