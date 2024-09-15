const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // Set this to 'production' for production builds
  entry: "./src/index.js", // Entry point for client-side
  output: {
    path: path.resolve(__dirname, "build"), // Output directory for the bundle
    filename: "bundle.js", // Client-side bundle name
    publicPath: "/", // Needed for React Router to work with deep links
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Support for image files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]", // Ensure cache busting for images
              outputPath: "assets/images", // Save images in a specific folder
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Use an HTML template
      inject: true, // Automatically inject the client-side bundle
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"], // Resolve JS and JSX extensions
  },
  devServer: {
    historyApiFallback: true, // Necessary for React Router to handle client-side routing
    contentBase: path.resolve(__dirname, "build"), // Serve content from the build directory
    hot: true, // Enable hot module replacement
    port: 3000, // Development server port
  },
};
