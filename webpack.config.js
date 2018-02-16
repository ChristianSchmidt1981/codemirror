const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'main.css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  entry: './init/app.js',
  output: {
    filename: 'public/assets/js/bundle.js',
  },
  devServer: {
    contentBase: "public",
    compress: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001",
    }
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [/*{
          loader: 'style-loader',
        }, */{
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: [
              'transform-runtime',
            ],
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: [
    extractSass,
    new CompressionPlugin({
      test: /\.js/,
    }),
  ],
};
