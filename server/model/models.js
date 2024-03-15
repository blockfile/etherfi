const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        filename: { type: String, required: true },
        path: { type: String, required: true }, // Store the full path including the wallet address
        extension: {
            type: String,
            required: function () {
                return !this.isFolder;
            },
        },
        size: {
            type: String,
            required: function () {
                return !this.isFolder;
            },
        },
        isFolder: {
            type: Boolean,
            default: false,
        },
        walletAddress: { type: String, required: true },
    },
    { timestamps: true }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
