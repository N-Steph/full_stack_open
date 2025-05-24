const LoginForm = ({newBlogHandler}) => {
    return (
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
    )
}

export default LoginForm