const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
  {
    mode: "development",
    entry: "./src/index.ts",
    output: {
      path: path.join(__dirname, "build"),
      filename: "main.js",
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    target: "web",
    node: {
      __dirname: false,
    },
    plugins: [
      new HtmlWebpackPlugin({ title: "Slot Machine Preview" }),
      new CopyPlugin({
        patterns: [
          { from: "src/assets", to: "assets", noErrorOnMissing: true },
        ],
      }),
    ],
    devServer: {
      allowedHosts: "auto",
      port: 9000,
    },
    devtool: "inline-source-map",
  },
];
