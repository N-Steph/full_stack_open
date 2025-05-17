const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

describe("test users api", () => {
    const users = [
        {
            username: "hellas",
            name: "Arto Hellas",
            password: "hela2147@"
        },
        {
            username: "nsteph",
            name: "Stephane Nouaffo",
            password: "ztw658/*-2"
        }
    ]

    beforeEach( async () => {
        await User.deleteMany({})

        await User.insertMany(users)
    })

    describe("post endpoint", () => {
        test("returns 400 when username is invalid", async () => {
            const newUser = {
                username: "li",
                name: "Nkongki",
                password: "32slgjoue"
            }
            
            await api
              .post('/api/users')
              .send(newUser)
              .expect(400)
              .expect('Content-Type', /application\/json/)
        })

        test("returns 400 when password is invalid", async () => {
            const newUser = {
                username: "shunLi",
                name: "Nkongki",
                password: "32"
            }
            
            await api
              .post('/api/users')
              .send(newUser)
              .expect(400)
              .expect('Content-Type', /application\/json/)
        })

        test("returns 201 created when inputs are valid for new user", async () => {
            const newUser = {
                username: "ShunLi",
                name: "Nkongki Ouest",
                password: "32slgjoue"
            }

            await api
              .post('/api/users')
              .send(newUser)
              .expect(201)
              .expect('Content-Type', /application\/json/)
            
            
            const usersAfterInsert = await User.find({})
            assert.equal(usersAfterInsert.length, users.length + 1)
        })
    })

    after(async () => {
        await mongoose.connection.close()
    })
})