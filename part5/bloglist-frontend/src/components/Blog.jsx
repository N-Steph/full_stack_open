import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, reorder }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [blogDetails, setBlogDetails] = useState(blog)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const incrementLikes = async (id) => {
    setLikes(likes + 1)
    const data = await blogService.updateLikes(id, {...blogDetails, likes: likes + 1})
    if (data.status != 201) {
      alert('could not update like in backend')
      setLikes(likes - 1)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={{display: visible ? '' : 'none'}}>
        <p>{blog.url}</p>
        <p>likes {likes} <button onClick={() => {incrementLikes(blog.id)}}>like</button></p>
        <p>{blog.user.username}</p>
      </div>
  </div>
)}

export default Blog