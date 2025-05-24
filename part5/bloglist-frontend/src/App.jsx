import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')))
  const [message, setMessage] = useState({
    message: null,
    status: 1
  })
  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    })
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
    newBlogRef.current.toggleVisibility()
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

  const deleteBlog = async (id, token, blogtext) => {
    if (window.confirm(`Remove ${blogtext}`)) {
      const index = blogs.indexOf(id)
      blogs.splice(index, 1)
      setBlogs([...blogs])
      await blogService.deleteBlog(id, token) 
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message.message} status={message.status}/>
        <LoginForm loginHandler={loginHandler} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.message} status={message.status}/>
      <p>{ user.username } logged in <button onClick={logoutHandler}>logout</button></p>
      <Togglable ref={newBlogRef}>
        <NewBlogForm newBlogHandler={newBlogHandler}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )
}


export default App