const path = require("path");
const { ProvidePlugin } = require("webpack"); // {} → オブジェクトリテラルにより分割代入 // webpackの標準のプラグイン
const MiniCSssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ({ outputFile }) => ({
  entry: {
    app: "./src/js/app.js",
    sub: "./src/js/sub.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: `./js/${outputFile}.js`,
    chunkFilename: `./js/${outputFile}.js`
  },
  module: {
    rules: [
      {
        enforce: "pre", // 先に処理を実行
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/, //"$"末尾を表す。ここでは.sassで終わりを示す
        use: [
          // "style-loader",
          MiniCSssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "./images/[name].[ext]"
        }
      },
      {
        test: /\.ejs$/i,
        use: ["html-loader", 'ejs-plain-loader']
      }
      // {
      //   test: /\.html$/,
      //   use: ["html-loader"]
      // }
    ]
  },
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
  plugins: [
    new MiniCSssExtractPlugin({
      filename: `${outputFile}.css`
    }),
    new ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      utils: [path.resolve(__dirname, "src/js/utils"), "default"]
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0, // バイト
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /node_modules/,
          priority: -10
        },
        utils: {
          name: "utils",
          test: /src[\\/]/,
          chunks: "initial"
        },
        default: false
      }
    }
  },
  resolve: {
    alias: {
      //特定の文字列をパスに紐づけることが可能
      "@scss": path.resolve(__dirname, "src/scss"),
      "@imgs": path.resolve(__dirname, "src/images")
    },
    extensions: [".js", ".scss"], //拡張子を省略可
    modules: [path.resolve(__dirname, "src"), "node_modules"] //指定したフォルダの配下にあるものを特定する
  },
});
