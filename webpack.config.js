import webpack from 'webpack'

export default {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client',
  ],
  module: {
    loaders: [{
      include: /src/,
      loaders: ['babel'],
      test: /\.js$/,
    }],
  },
  output: {
    filename: 'client.js',
    path: __dirname,
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}
