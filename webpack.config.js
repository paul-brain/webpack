const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const target = mode === 'development' ? 'web' : 'browsersList';
const devtool = mode === 'development' ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  entry: './src/index.js',
  output: {
    filename: '[name][contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  devServer: {
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|svg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff2|woff|eof|)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/i,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          },
        },
      },
    ],
  },

};
