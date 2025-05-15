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

blogRouter.delete('/blogs/:id', async (request, response) => {
  const id = request.params.id
  try {
    const promise = await Blog.findByIdAndDelete(id)
    response.status(204).end()
  }
  catch(error) {
    console.log(error)
  }
})

blogRouter.put('/blogs/:id', async (request, response) => {
  const { likes } = request.body
  if (!/^[0-9a-fA-F]{24}$/.test(request.params.id)) {
    return response.status(400).end()
  }
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  if (!blog) {
    return response.status(404).end()
  }
  blog.likes = likes
  try {
    const updatedBlog = await blog.save()
    response.status(201).json(updatedBlog)
  }
  catch(error) {
    console.log(error)
  }
})

module.exports = blogRouter