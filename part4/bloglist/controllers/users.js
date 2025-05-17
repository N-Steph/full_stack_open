const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
        next({
            name: 'ValidationError',
            message: 'User validation failed: password: `password` is not defined or shorter than the minimum allowed length (3).'
        })
        return
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await newUser.save()
        response.status(201).json(savedUser)
    }
    catch (error) {
        next(error)
    }
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({})

    response.status(200).json(users)
})

module.exports = userRouter