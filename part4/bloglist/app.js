const config = require('./utils/config')
const express = require('express')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()

mongoose.connect(config.MONGODB_URI).then(response => console.log('connected to mongodb'))

morgan.token('data', function getPostData(req) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use('/api', blogRouter)

module.exports = app