const { join, resolve } = require("path");
const { DefinePlugin } = require("webpack");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = dotenv.config({ path: join(__dirname, "..", "..", ".env") }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: {
    index: join(__dirname, "..", "..", "src", "app", "App.tsx"),
  },
  output: {
    hashFunction: "xxhash64",
    path: resolve(__dirname, "..", "..", "dist"),
    filename: "[name].js",
    publicPath: "/",
    chunkFilename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          {
            test: /\.module\.(sa|sc|c)ss$/,
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
              "sass-loader",
            ],
          },
          {
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      "node_modules",
      resolve(__dirname, "..", "..", "src"),
      resolve(__dirname, "..", "..", "node_modules"),
    ],
    extensions: [".ts", ".tsx", ".js"],
  },
  resolveLoader: {
    modules: ["node_modules", resolve(__dirname, "..", "..", "node_modules")],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "..", "..", "public", "index.html"),
    }),
    new DefinePlugin(envKeys),
  ],
};
