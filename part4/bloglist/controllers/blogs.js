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

blogRouter.post('/blogs', async (request, response , next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  if (!blog.title || !blog.url) {
    response.status(400).end()
    return
  }

  try {
    const result =  await blog.save()
    response.status(201).json(result)
  }
  catch (exception) {
    console.log(exception)
  }
  
})

blogRouter.delete('/blogs/:id', async (request, response) => {
  const id = request.params.id
  if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    return response.status(400).end()
  }
  try {
    const blog = await Blog.findByIdAndDelete(id)
    if (!blog) {
      return response.status(404).end()
    }
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