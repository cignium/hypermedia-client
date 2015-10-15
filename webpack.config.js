import webpack from 'webpack'

export default {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src',
  ],
  module: {
    loaders: [{
      include: /src/,
      loaders: ['babel'],
      test: /\.js$/,
    },{
      include: /src/,
      loaders: ['eslint'],
      test: /\.js$/,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}
