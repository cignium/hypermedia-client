import shared from './webpack.shared.config'
import webpack from 'webpack'

export default {
  ...shared,
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src',
    './themes/default/index.css',
  ],
  module:{
    loaders:[
      ...shared.module.loaders,
      {
        exclude: /src/,
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
