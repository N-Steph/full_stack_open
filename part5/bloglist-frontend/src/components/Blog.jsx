import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
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
      <div style={{display: visible ? 'none' : ''}}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={{display: visible ? '' : 'none'}}>
        {blog.title} {blog.author}
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.user.username}</p>
      </div>
  </div>
)}

export default Blog