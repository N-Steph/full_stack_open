const loginForm = ({ loginHandler }) => {
    return (
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
    )
}