import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))
  const [message, setMessage] = useState({
    message: null,
    status: 1
  })

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
    if (!validation) {
      setMessage({
        message: 'wrong user name or password',
        status: 1
      })
      setTimeout(() => {
        setMessage({
          message: null,
          status: 1
        })
      }, 3000)
      return
    }
    event.target.reset()
    window.localStorage.setItem('user', JSON.stringify(validation))
    setUser(JSON.parse(window.localStorage.getItem('user')))
    setMessage({
      message: 'successful log in',
      status: 0
    })
    setTimeout(() => {
      setMessage({
          message: null,
          status: 1
        })
    }, 3000)
  }

  const logoutHandler = () => {
    window.localStorage.clear()
    setMessage({
      message: `${user.username} logged out successfully`,
      status: 0
    })
    setUser(null)
    setTimeout(() => {
      setMessage({
          message: null,
          status: 1
        })
    }, 3000)
  }

  const newBlogHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const formValues = Object.fromEntries(formData.entries())
    const result = await blogService.postBlogDetails(formValues, user.token)
    if (result.status === 201) {
      event.target.reset()
      setBlogs(blogs.concat(result.data))
      setMessage({
        message: `${result.data.title} by ${result.data.author}`,
        status: 0
      })
      setTimeout(() => {
        setMessage({
          message: null,
          status: 1
        })
      }, 3000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.message} status={message.status}/>
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
      <Notification message={message.message} status={message.status}/>
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