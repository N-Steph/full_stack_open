const app = require('../app')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')

const api = supertest(app)

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


test("post new data correctly", async () => {
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
    
    const blogsNewState = await Blog.find({})
    const titles = blogsNewState.map(blog => blog.title)
    assert.equal(blogsNewState.length, blogs.length + 1)
    assert(titles.includes("First class tests"))
})

test("default likes to 0 if missing", async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  }
  const response = await api.post('/api/blogs').send(newBlog)
  const savedBlog = response.body
  console.log(savedBlog)
  
  assert.equal(savedBlog.likes, 0)
})

test("handle bad request", async () => {
  const newBlog = {
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

after(async () => {
    await mongoose.connection.close()
})