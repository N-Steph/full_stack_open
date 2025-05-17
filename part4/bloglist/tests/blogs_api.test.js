const app = require('../app')
const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

describe("test api route", () => {

  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    }
]
  beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(blogs)
  })

  describe("test get request", () => {

    test("blogs are return as json", async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, blogs.length)
    })
  })

  describe("test post request", () => {

    test("with valid blog 201 is return", async () => {
      const newBlog = {
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10
        }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogsNewState = await api.get('/api/blogs')
      const titles = blogsNewState.body.map(blog => blog.title)
      assert.equal(blogsNewState.body.length, blogs.length + 1)
      assert(titles.includes("First class tests"))
    })

    test("with missing title or author, 400 is return", async () => {
      const newBlog = {
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test("missing likes property is default to 0", async () => {
      const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      }
      const response = await api.post('/api/blogs').send(newBlog)
      const savedBlog = response.body
      assert.equal(savedBlog.likes, 0)
    })
  })

  describe("id property is the unique identifier", () => {

    test("id property is present and _id property is not present", async () => {
      const res = await api.get('/api/blogs')
    
      res.body.forEach(blog => {
        assert.notEqual(blog.id, undefined)
        assert.equal(res._id, undefined)
      })
    })
  })


  describe("test delete request", () => {

    test("with a valid id blog post resource", async () => {
      const res = await api.get('/api/blogs')
      await api
        .delete(`/api/blogs/${res.body[0].id}`)
        .expect(204)
      
      const promise = await api.get('/api/blogs')
      assert.equal(promise.body.length, blogs.length - 1)
    })
    
    test("with a valid but non existing id 404 is return", async () => {
      await api
        .delete(`/api/blogs/6824785608fd7ba6ab3a8f2a`)
        .expect(404)
    })
    
    test("with an invalid id 400 is return", async () => {
      await api
        .delete(`/api/blogs/46465489764564`)
        .expect(400)
    })
  })

  describe("test put request" , () => {

    test("with valid id 201 is return",  async () => {
      const res = await api.get('/api/blogs')
      await api
        .put(`/api/blogs/${res.body[0].id}`)
        .send({ ...res.body[0], likes: 10})
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blog = await Blog.findById(res.body[0].id)
      assert.equal(blog.likes, 10)
    })
    
    test("with non existing id 404 is return", async () => {
      const res = await api.get('/api/blogs')
      await api
        .put(`/api/blogs/6824785608fd7ba6ab3a8f2a`)
        .send({...res.body[0], likes: 10})
        .expect(404)
    })
    
    test("with an invalide id 400 is return", async () => {
      const res = await api.get('/api/blogs')
      await api
        .put(`/api/blogs/6824785608fd7ba6ab3a8f2af`)
        .send({...res.body[0], likes: 10})
        .expect(400)
    })
  })

    after(async () => {
        await mongoose.connection.close()
    })
})