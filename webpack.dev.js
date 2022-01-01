const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge').merge;
const commonConf = require('./webpack.common');
const outputFile = '[name]';

module.exports = () =>
  webpackMerge(commonConf({ outputFile }), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      open: true, //自動でweb上に開く
      contentBase: './public',
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.ejs',
        inject: 'body',
        chunk: ['app'],
      }),
      new HtmlWebpackPlugin({
        template: './src/work.ejs',
        filename: 'work.html',
        inject: 'body',
        chunk: ['sub'],
      }),
      new HtmlWebpackPlugin({
        template: './src/contact.ejs',
        filename: 'contact.html',
        inject: 'body',
        chunk: ['sub'],
      }),
    ],
  });
