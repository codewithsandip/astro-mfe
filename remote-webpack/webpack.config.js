const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.jsx",
    output: {
        filename: "remote.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "http://localhost:4001/"
    },
    devServer: {
        port: 4001,
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        hot: false,
        liveReload: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    }
};
