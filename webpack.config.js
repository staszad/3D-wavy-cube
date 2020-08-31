const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src/script/main.ts"),
    resolve: {
        modules: [path.resolve(__dirname, "src/script"), "node_modules"],
        extensions: [".js", ".jsx", ".json", ".ts"],
        alias: {
            "~": path.join(__dirname, "src"),
            "@": path.join(__dirname, "src/script"),
        },
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true },
                    },
                ],
            },
            {
                test: /\.(m?js|tsx?)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-typescript",
                        ],
                        plugins: ["@babel/plugin-transform-runtime"],
                    },
                },
            },
        ],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
            filename: "index.html",
            scriptLoading: "defer",
        }),
    ],
};
