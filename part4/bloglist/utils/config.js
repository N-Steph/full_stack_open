require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI === 'test' ? process.env.MONGODB_URI_TEST : process.env.MONGODB_URI
const PORT = process.env.PORT

module.exports = { MONGODB_URI, PORT}