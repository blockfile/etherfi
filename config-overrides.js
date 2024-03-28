const { override, addWebpackModuleRule } = require("customize-cra");
const webpack = require("webpack");
function customizeSourceMapLoader(config) {
    // Find the rule that contains the oneOf array
    const oneOfRule = config.module.rules.find((rule) =>
        Array.isArray(rule.oneOf)
    );
    if (oneOfRule) {
        // Modify each rule within the oneOf array
        oneOfRule.oneOf = oneOfRule.oneOf.map((rule) => {
            // Check if the rule uses source-map-loader
            if (rule.loader && rule.loader.includes("source-map-loader")) {
                // Exclude all of node_modules from being processed by source-map-loader
                const updatedRule = {
                    ...rule,
                    exclude: /node_modules/,
                };
                return updatedRule;
            }
            return rule;
        });
    }

    return config;
}

function addNodePolyfills(config) {
    config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        assert: require.resolve("assert"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        // Add other Node core modules you need to polyfill here
    };

    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
            process: "process/browser", // if you also need to polyfill 'process'
        }),
    ]);

    return config;
}

module.exports = override(
    addWebpackModuleRule({
        test: /\.glsl$/,
        use: ["raw-loader"],
    }),
    // Customize source map loader
    customizeSourceMapLoader,
    // Add polyfills
    addNodePolyfills
);
