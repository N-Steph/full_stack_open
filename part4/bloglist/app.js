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
app.use(morgan(function (tokens, req, res) {
  const status = tokens.status(req, res);
  const statusColor = status >= 500 ? 31 
    : status >= 400 ? 33 
    : status >= 300 ? 36 
    : status >= 200 ? 32 
    : 0; 
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    '\x1b[' + statusColor + 'm' + status + '\x1b[0m',
    tokens['response-time'](req, res), 'ms', '-',
    tokens.res(req, res, 'content-length'),
    tokens['data'](req, res)
    ].join(' ');
  }, {
    skip: () => process.env.NODE_ENV === 'test'
  })
)
app.use('/api', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app