const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

let mode = "development";
let target = "web";

if (process.env.NODE_ENV === "production") {
  mode = "production";
  target = "browserslist";
}

module.exports = {
  mode: mode,
  target: target,
  output: {
    path: path.resolve(__dirname, "build"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: "asset/resource",
        // type: "asset/resource", // It will save all images files as files
        // type: "asset/inline", // It will save all images files as base64
        // type: "asset", //It will save all images files as files and base64 dependencies on size of image.
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024,
          },
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // publicPath: process.env.PUBLIC_URL || "/",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/manifest.json", to: "manifest.json" },
        { from: "public/favicon.ico", to: "favicon.ico" },
        { from: "public/logo192.png", to: "logo192.png" },
        { from: "public/logo512.png", to: "logo512.png" },
        { from: "public/robots.txt", to: "robots.txt" },
      ],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    fallback: {
      path: require.resolve("path-browserify"),
      fs: require.resolve("browserify-fs"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      buffer: require.resolve("buffer"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify"),
      url: require.resolve("url"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      zlib: require.resolve("browserify-zlib"),
      querystring: require.resolve("querystring-es3"),
      assert: require.resolve("assert"),
      vm: require.resolve("vm-browserify"),
    },
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    allowedHosts: "all",
    hot: true,
    compress: true,
    port: 9000,
  },
};
