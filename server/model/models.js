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

const ipfsSchema = new mongoose.Schema(
    {
        IpfsHash: { type: String, required: true },
        PinSize: { type: Number, required: true },
        Timestamp: { type: Date, default: Date.now },
        filename: { type: String, required: true },
        type: { type: String, required: true },
        link: { type: String, required: true },
        walletAddress: { type: String, required: true }, // Added walletAddress field
    },
    { timestamps: true }
);

const IPFS = mongoose.model("IPFS", ipfsSchema);

module.exports = IPFS;
