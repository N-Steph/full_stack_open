const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    name: String,
    passwordHash: String
})

const User = mongoose.model('User', userSchema)

module.exports = User