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
      include: /src/,
      loaders: ['style', 'css?modules', 'cssnext'],
      test: /\.css$/,
    },{
      include: /node_modules/,
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
