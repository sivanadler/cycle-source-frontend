import React from "react"
import { connect } from 'react-redux'


const Login = (props) => {
  function handleSubmit(e){
    e.preventDefault()
    props.logUserIn()
  }

  return (
  <div className="login">
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" /> <br/>
      <input type="password" name="password" /> <br/>
      <input type="submit" name="submit" value="Log In" />
    </form>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn
  }
}


const mapDispatchtoProps = dispatch => {
  return {
    logUserIn: () => dispatch({ type: "LOG_USER_IN" }),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(Login)
