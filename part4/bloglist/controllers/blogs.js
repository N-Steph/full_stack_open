const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router() 

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    response.status(200).json(blogs)
  }
  catch(error) {
    next(error)
  }
  
})

blogRouter.post('/', async (request, response , next) => {
  const body = request.body
  const user = request.user
  try {
    if (!user) {
      return response.status(401).json({ error: 'invalid token'})
    }
    if (!user.id) {
      return response.status(401).json({ error: 'user id missing or invalid'})
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id,
      likes: body.likes || 0
    })
    if (!blog.title || !blog.url) {
      response.status(400).end()
      return
    }
    const savedBlog =  await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
  }
  catch (error) {
    next(error)
  }
  
})

blogRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const user = request.user
  try {
    if (!user) {
      return response.status(401).json({ error: 'invalid token'})
    }
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return response.status(400).end()
    }
    const blog = await Blog.findById(id)
    if (!blog) {
      return response.status(404).end()
    }
    if (!(blog.user.toString() === decodedToken.id.toString())) {
      return response.status(401).json({
        error: "user can't delete a blog he/she didn't write"
      })
    }
    await Blog.deleteOne({_id: id})
    const index = user.blogs.indexOf(id)
    user.blogs.splice(index, 1)
    await user.save()
    response.status(204).end()
  }
  catch(error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const { likes } = request.body
  if (!/^[0-9a-fA-F]{24}$/.test(request.params.id)) {
    return response.status(400).end()
  }
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  blog.likes = likes
  try {
    const updatedBlog = await blog.save()
    response.status(201).json(updatedBlog)
  }
  catch(error) {
    next(error)
  }
})

module.exports = blogRouter