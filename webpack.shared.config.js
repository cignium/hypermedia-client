import webpack from 'webpack'

export default {
  module: {
    loaders: [{
      include: /src/,
      loaders: ['babel', 'eslint'],
      test: /\.js$/,
    },{
      include: /src/,
      loaders: ['style', 'css?modules'],
      test: /\.css$/,
    },{
      exclude: /src/,
      loaders: ['style', 'css'],
      test: /\.css$/,
    }],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
}
