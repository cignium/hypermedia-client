import express from 'express'
import compression from 'compression'
import config from './webpack.config'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler))

app.get('/node_modules/*', (req, res) => {
  res.sendFile(path.join(__dirname, req.path))
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'demo', req.path))
})

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})
