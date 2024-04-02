const mongoose = require("mongoose");

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
