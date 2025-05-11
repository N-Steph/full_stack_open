const config = require('./utils/config')
const express = require('express')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

const app = express()

mongoose.connect(config.MONGODB_URI).then(response => console.log('connected to mongodb'))


app.use(express.json())
app.use('/api', blogRouter)

module.exports = app