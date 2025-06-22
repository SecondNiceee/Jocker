const webpack = require("webpack");

module.exports = function override(config, env) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
    };

    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"];

    config.output = {
        ...config.output,
        publicPath: '/', // Убедитесь, что publicPath установлен на корень
    };

    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser.js",
            Buffer: ["buffer", "Buffer"],
        }),
        new webpack.DefinePlugin({
            "process.env.REACT_APP_API_KEY": JSON.stringify(process.env.REACT_APP_API_KEY || 'development')
        })
    ];

    return config;
};
