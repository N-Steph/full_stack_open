const config = require('./utils/config')
const express = require('express')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

morgan.token('data', function getPostData(req) {
    return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev', {
    skip: () => process.env.NODE_ENV === 'test'
}))
app.use('/api', blogRouter)
app.use(middleware.unknownEndpoint)

module.exports = app