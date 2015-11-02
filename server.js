import express from 'express'
import config from './webpack.config'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    cached: false,
  },
}))

app.use(webpackHotMiddleware(compiler))
app.use(express.static('demo'))

app.listen(3000, '0.0.0.0', err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})
