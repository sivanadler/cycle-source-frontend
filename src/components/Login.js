import React from "react"

const Login = (props) => {
  return (
  <div className="login">
    <form>
      <input type="text" name="username" /> <br/>
      <input type="password" name="password" /> <br/>
      <input type="submit" name="submit" value="Log In" />
    </form>
  </div>
  )
}

export default Login
