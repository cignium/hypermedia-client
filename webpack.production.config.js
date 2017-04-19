import ExtractTextPlugin from 'extract-text-webpack-plugin'
import shared from './webpack.shared.config'
import webpack from 'webpack'

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
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?mimetype=image/png',
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'url-loader?mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]',
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
