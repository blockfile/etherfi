const path = require("path");
const { override, addWebpackModuleRule } = require("customize-cra");

function customizeSourceMapLoader(config) {
    // Find the rule that contains the oneOf array
    const oneOfRule = config.module.rules.find((rule) =>
        Array.isArray(rule.oneOf)
    );
    if (oneOfRule) {
        // Modify each rule within the oneOf array
        oneOfRule.oneOf = oneOfRule.oneOf.map((rule) => {
            // Check if rule uses source-map-loader
            if (rule.loader && rule.loader.includes("source-map-loader")) {
                // Exclude @mediapipe/tasks-vision from being processed by source-map-loader
                const updatedRule = {
                    ...rule,
                    exclude: /node_modules\/@mediapipe\/tasks-vision/,
                };
                return updatedRule;
            }
            return rule;
        });
    }

    return config;
}

module.exports = override(
    addWebpackModuleRule({
        test: /\.glsl$/,
        use: ["raw-loader"],
    }),
    customizeSourceMapLoader // Apply the customization to exclude @mediapipe/tasks-vision
);
