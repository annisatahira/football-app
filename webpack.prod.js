const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      /* babel loader */
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                { plugins: ["@babel/plugin-proposal-class-properties"] },
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        {
          from: "**/*",
          to: path.join(__dirname, "./dist"),
        },
      ],
    }),
  ],
});
