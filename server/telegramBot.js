const TelegramBot = require("node-telegram-bot-api");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mongoose = require("mongoose");
require("dotenv").config();
const UserFile = require("../server/model/user"); // Adjust the path as needed

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
let session = {};
// Dynamically import node-fetch
const AWS = require("aws-sdk");

let fetch;
import("node-fetch")
    .then(({ default: fetched }) => (fetch = fetched))
    .catch((err) => console.error("Failed to load node-fetch:", err));

// Setup AWS S3 client for DigitalOcean Spaces
AWS.config.update({
    accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
    secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
    region: "sgp1", // This is optional as the endpoint defines the region in DigitalOcean Spaces
});

const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint("https://sgp1.digitaloceanspaces.com"),
    s3ForcePathStyle: true, // needed with custom endpoint
});

mongoose
    .connect(process.env.DATABASE_ACCESS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log("MongoDB connection error:", err));

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome! What would you like to do?", {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Upload File", callback_data: "upload" }],
                [{ text: "Set Wallet Address", callback_data: "set_wallet" }],
            ],
        },
    });
});

bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;
    const data = callbackQuery.data;

    switch (data) {
        case "upload":
            bot.sendMessage(chatId, "Please send the file you wish to upload.");
            break;
        case "check_size":
            bot.sendMessage(
                chatId,
                "Please enter your wallet address to check the space allocation."
            );
            break;
        case "set_wallet":
            bot.sendMessage(chatId, "Please send your wallet address.");
            break;
        default:
            bot.sendMessage(chatId, "Unknown command. Please try again.");
    }
});

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    if (msg.text && msg.text.startsWith("0x")) {
        session[chatId] = msg.text; // Store wallet address in session
        bot.sendMessage(
            chatId,
            "Wallet address set. Please upload your file now."
        );
    } else if (msg.document && session[chatId]) {
        const walletAddress = session[chatId];
        const fileId = msg.document.file_id;
        const fileName = msg.document.file_name || "default_filename";
        const mimeType = msg.document.mime_type || "application/octet-stream";

        try {
            const url = await bot.getFileLink(fileId);
            const response = await fetch(url);
            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const filePath = `${walletAddress}/${fileName}`;
            const fullPath = `uploads/${filePath}`;

            const params = {
                Bucket: "web3storage",
                Key: fullPath,
                Body: buffer,
                ACL: "public-read",
                ContentType: mimeType,
            };

            s3.upload(params, function (err, data) {
                if (err) {
                    console.error("AWS S3 Upload Error:", err);
                    bot.sendMessage(
                        chatId,
                        `Failed to upload the file to storage: ${err.message}`
                    );
                    return;
                }

                // Save file information to MongoDB
                const newFile = new UserFile({
                    walletAddress,
                    filename: fileName,
                    path: data.Location,
                    extension: fileName.split(".").pop(),
                    size: buffer.length.toString(),
                });

                newFile
                    .save()
                    .then(() => {
                        bot.sendMessage(
                            chatId,
                            "File uploaded successfully and saved to database."
                        );
                    })
                    .catch((dbError) => {
                        console.error("Database Error:", dbError);
                        bot.sendMessage(
                            chatId,
                            `Failed to save file info to database: ${dbError.message}`
                        );
                    });
            });
        } catch (err) {
            console.error("Error processing file:", err);
            bot.sendMessage(
                chatId,
                `Failed to process your file: ${err.message}`
            );
        }
    } else {
        bot.sendMessage(chatId, "Please send your wallet address first.");
    }
});

module.exports = bot;
