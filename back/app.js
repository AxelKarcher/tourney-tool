const express = require('express')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.listen(process.env.PORT, console.log('Port:', process.env.PORT))

const paths = ['pseudo1', 'pseudo2', 'cast', 'match']

app.post('/files/', (req, res) => {
  for (const item in req.body.data) {
    fs.writeFileSync('./files/' + item + '.txt', req.body.data[item])
  }
  res.send('OK')
})

app.get('/files', (req, res) => {
  let newRes = {pseudo1: '', pseudo2: '', cast: '', match: ''}

  paths.forEach(elem => {
    newRes[elem] =
      fs.readFileSync('./files/' + elem + '.txt').toString()
  })

  res.send(newRes)
})