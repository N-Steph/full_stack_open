const Blog = require('../models/blog')
const blogRouter = require('express').Router() 

blogRouter.get('/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  }
  catch(error) {
    console.log(error)
  }
  
})

blogRouter.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.likes) {
    blog.likes = 0
  }
  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }

  try {
    const result = await blog.save()
    response.status(201).json(result)
  }
  catch(error) {
    console.log(error)
  }
  
})

module.exports = blogRouter