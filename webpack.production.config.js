import shared from './webpack.shared.config'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  ...shared,
  entry: [
    './src',
    './themes/default/index.css',
  ],
  output: {
    filename: 'client.min.js',
    library: 'Cignium',
    libraryTarget: 'var',
    path: './dist/',
  },
  module: {
    loaders:[
      ...shared.module.loaders,
      {
        exclude: /src/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),      
        test: /\.css$/,
      }],
  },
  plugins: [
    ...shared.plugins,
    new ExtractTextPlugin('app.css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
      },
    }),
  ],
}
