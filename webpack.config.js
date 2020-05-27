const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./frontend/src/index.js"],
  output: {
    path: path.resolve(__dirname, "frontend/static"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(jpg|gif|png)/,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
};
