import webpack from 'webpack'

export default {
  entry: './src/client.js',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.js$/,
      },
    ],
  },
  output: {
    filename: './dist/client.min.js',
  },
  plugins: [
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
