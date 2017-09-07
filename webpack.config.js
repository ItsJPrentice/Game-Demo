const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const _ = require('lodash');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              includePaths: ['/styles'],
              sourceMap: true
            }
          }
        ]
      }

    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Game Demo' }),
    new GenerateJsonPlugin('sprite-assets-manifest.json', getAssetsManifest())
  ]
}

function getAssetsManifest() {
  return walkFolder(path.resolve(__dirname, 'src/game/_assets'));
}

function walkFolder(dirPath) {
  return _.flatten(_.map(fs.readdirSync(dirPath), fileName => {
    let filePath = dirPath + '/' + fileName,
        stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) return walkFolder(filePath).map(file => fileName + '/' + file);
    return fileName;
  }));
}