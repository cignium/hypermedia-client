import shared from './webpack.shared.config'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  ...shared,
  entry: [
    './src',
  ],
  output: {
    filename: 'client.min.js',
    library: 'Cignium',
    libraryTarget: 'var',
    path: './dist/',
  },
  module: {
    loaders:[
      {
        include: /src/,
        loaders: ['babel', 'eslint'],
        test: /\.js$/,
      },
      {
        include: /node_modules/,
        loaders: ['style', 'css'],
        test: /\.css$/,
      },
      {
        include: /themes/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
        test: /\.css$/,
      }],
  },
  plugins: [
    ...shared.plugins,
    new ExtractTextPlugin('default.css', {
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
