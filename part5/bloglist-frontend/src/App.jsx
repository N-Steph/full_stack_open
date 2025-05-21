import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formValues = Object.fromEntries(formData.entries())
    const validation = await blogService.postCredentials(formValues)
    event.target.reset()
    if (!validation) {  
      return
    }
    window.localStorage.setItem('user', JSON.stringify(validation))
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }

  const logoutHandler = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const newBlogHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formValues = Object.fromEntries(formData.entries())
    await blogService.postBlogDetails(formValues, user.token)
    event.target.reset()
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={loginHandler}>
          <label htmlFor="Usrname">username</label>
          <input 
            type="text" 
            id="Usrname"
            name="username"
          /><br/>

          <label htmlFor="Upassword">password</label>
          <input 
            type="password" 
            id="Upassword" 
            name="password"
          /><br/>

          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{ user.username } logged in</p> <button onClick={logoutHandler}>logout</button>
      <h2>create new</h2>
      <form onSubmit={newBlogHandler}>
        <label htmlFor='title'>title:</label>
        <input 
          type='text'
          id='title'
          name='title'
          /><br/>
        <label>author:</label>
        <input 
          type='text'
          id='author'
          name='author'
          /><br/>
        <label>url:</label>
        <input 
          type='text'
          id='url'
          name='url'
          /><br/>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App