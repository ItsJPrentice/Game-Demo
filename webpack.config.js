const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const _ = require('lodash');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './index.ts',
  context: path.resolve(__dirname, 'src'),
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
        type: 'asset/resource'
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
              sassOptions: {
                includePaths: ['/styles']
              },
              sourceMap: true
            }
          }
        ]
      }

    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      'punycode': require.resolve('punycode/')
    },
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
  plugins: [
    new HtmlWebpackPlugin({ title: 'Game Demo' }),
    new GenerateJsonPlugin('sprite-assets-manifest.json', getAssetsManifest())
  ]
}

function getAssetsManifest() {
  let assetsRoot = 'src/game/_assets/';
  return walkFolder(path.resolve(__dirname, assetsRoot)).map(assetPath => '' + assetPath);
}

function walkFolder(dirPath) {
  return _.flatten(_.map(fs.readdirSync(dirPath), fileName => {
    let filePath = dirPath + '/' + fileName,
        stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) return walkFolder(filePath).map(file => fileName + '/' + file);
    return fileName;
  }));
}