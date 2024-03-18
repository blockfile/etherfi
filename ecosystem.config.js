module.exports = {
    apps: [
        {
            name: "backend",
            script: "server.js",
            cwd: "./", // Adjust if your server.js is in a different directory
            env: {
                SPACES_ACCESS_KEY_ID: "DO00U4ECB98HX87HX9PF",
                SPACES_SECRET_ACCESS_KEY:
                    "gaFjG7KzrmrAjLTgRpOKhjRZ9LnJP1tveyLVVDpUoF8",
                DATABASE_ACCESS:
                    "mongodb+srv://sphereprotocol:sphereprotocol%402024@cluster0.8prwtk2.mongodb.net/sphere",
            },
        },
    ],
};
