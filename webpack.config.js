const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: 'main.css',
  disable: process.env.NODE_ENV === 'development',
});

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'public/assets/js/bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['public/assets/css'],
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['es2015', { modules: false }], 'react'],
            plugins: ['transform-runtime'],
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
