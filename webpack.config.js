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
      {
        include: [/themes/, /node_modules/],
        loaders: ['style', 'css'],
        test: /\.css$/,
      }],
  },
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
