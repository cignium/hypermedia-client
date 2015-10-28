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
      loaders: ['babel', 'eslint'],
      test: /\.js$/,
    },{
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
}
