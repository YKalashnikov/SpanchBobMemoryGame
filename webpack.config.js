const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'production',
    entry: {
      main: './app.js'
    },
    output: {
       filename: '[name].[contenthash].js',
       path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
            from: path.resolve(__dirname,'src/icon.png'),
            to: path.resolve(__dirname,'dist')
        },
        {
            from: path.resolve(__dirname,'src/audio'),
            to: path.resolve(__dirname,'dist')
        },
        {
            from: path.resolve(__dirname,'src/images'),
            to: path.resolve(__dirname,'dist')
        }
        
    ]),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    })
      ],
      module: {
          rules: [
              {
                  test: /\.css$/,
                  use: [{
                      loader: MiniCssExtractPlugin.loader,
                      options: {}
                  },'css-loader']
              },
              {
                  test: /\.(png|jpg|gif)$/,
                  use: ['file-loader']
              },
              
              {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                loader: ['file-loader']
              }
              
          ] 
      }
}