const { merge } = require("webpack-merge");
const { join } = require("path");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    server: "http",
    static: {
      directory: join(__dirname, "..", "..", "dist"),
    },
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 3009,
    headers: {},
  },
});
