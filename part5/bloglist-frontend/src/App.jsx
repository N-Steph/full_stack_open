import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleUserNameChange = (event) => {
    const value = event.target.value
    setUsername(value)
  }

  const handlePasswordChange = (event) => {
    const value = event.target.value
    setPassword(value)
  }

  const loginHandler = async (event) => {

    event.preventDefault()
    const validation = await blogService.postCredentials({ username, password })
    
    if (!validation) {
      return
    }
    setUser(validation)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          <label htmlFor="Usrname">username</label>
          <input 
            type="text" 
            id="Usrname" 
            value={username} 
            onChange={handleUserNameChange}
          /><br/>

          <label htmlFor="Upassword">password</label>
          <input 
            type="password" 
            id="Upassword" 
            value={upassword} 
            onChange={handlePasswordChange}
          /><br/>

          <button onClick={loginHandler}>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App