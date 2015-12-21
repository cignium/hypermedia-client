import shared from './webpack.shared.config'
import webpack from 'webpack'

export default {
  ...shared,
  entry: './src',
  output: {
    filename: './dist/client.min.js',
    library: 'Cignium',
    libraryTarget: 'var',
  },
  plugins: [
    ...shared.plugins,
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
