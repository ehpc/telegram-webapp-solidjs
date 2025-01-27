const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),
  target: "webworker",
  output: {
    filename: "worker.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "production",
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
    },
  },
  plugins: [
    new NodePolyfillPlugin({
      additionalAliases: ['process'],
    }),
  ],
  optimization: {
    minimize: false,
  },
  performance: {
    hints: false,
  },
};
