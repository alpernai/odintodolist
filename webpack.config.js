const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Import HtmlWebpackPlugin


module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader', 
          options: {
            presets: ['@babel/preset-env'], 
          },
        },
      },
    ],
  },
  devServer: {
    static: './dist', 
    open: true, 
    port: 8080, 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', 
    }),
  ],
};

