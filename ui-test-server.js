const express = require('express')

const app = express()
app.use(express.static('ui-tests'))
app.use(express.static('dist'))

app.listen(3004, '0.0.0.0', err => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3004')
})
