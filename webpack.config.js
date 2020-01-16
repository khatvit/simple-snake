const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //...
    mode: 'development',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 9000
    },
    plugins: [
      new HtmlWebpackPlugin({title:'snake',template: 'index.html'})
    ]
  };
