import shared from './webpack.shared.config'
import webpack from 'webpack'

export default {
  ...shared,
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src',
  ],
  module:{
    loaders:[
      {
        include: /src/,
        loaders: ['babel', 'eslint'],
        test: /\.js$/,
      },
  { test: /\.css$/, include: [/themes/, /node_modules/], loader: 'style-loader!css-loader' },
  { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
  { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' },
  { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: 'url-loader?mimetype=application/font-woff' },
  { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: 'file-loader?name=[name].[ext]' },
    ]},

  output: {
    filename: 'client.js',
    library: 'Cignium',
    libraryTarget: 'var',
    path: __dirname,
    publicPath: '/',
  },
  plugins: [
    ...shared.plugins,
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}
