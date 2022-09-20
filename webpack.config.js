const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isDevelopment = env.development || false
  return {
    entry: './src/index.js',
    mode: `${isDevelopment ? 'development' : 'production'}`,
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist/game/'),
      assetModuleFilename: 'static/[name][ext]',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Output Management',
        filename: 'game.html'
      }),
    ],
    module: {
      rules: [
        {
          test: /\.png/,
          type: 'asset/resource'
        }
      ]
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist/game/'),
      },
      compress: true,
      allowedHosts: 'all',
      port: 1337,
      hot: true
    }
  }
}