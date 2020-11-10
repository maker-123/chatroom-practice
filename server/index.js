const express = require('express')
const severController = require('./controllers/indexController')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = express()
const secretkey = 'chihuahua'
const port = 4000
//fire controllers
severController(app,jwt, mongoose , secretkey)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// this
