// const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const copyWebpackPlugin = require("copy-webpack-plugin");

const path = require("path");

module.exports = {
  entry: {
    index: "./index.js",
    team: "./team.js",
    serviceworker: "./service-worker.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      /* style and css loader */
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      /* babel loader */
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                { plugins: ["@babel/plugin-proposal-class-properties"] },
              ],
            },
          },
        ],
      },
      // url loader
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            name: "[name].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      template: "./team.html",
      filename: "team.html",
      chunks: ["team"],
    }),
    // new HtmlWebpackPlugin({
    //   template: "./src/components/nav-menu.html",
    //   filename: "nav-menu.html",
    //   path: path.resolve(__dirname, "dist"),
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/components/pages/home.html",
    //   filename: "home.html",
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/components/pages/saved.html",
    //   filename: "saved.html",
    // }),
    // new ServiceWorkerWebpackPlugin({
    //   entry: path.join(__dirname, "./src/service-worker.js"),
    // }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          to: path.join(__dirname, "./dist"),
        },
      ],
    }),
  ],
};
