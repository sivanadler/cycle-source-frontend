import React from "react"
import InstructorForm from './InstructorForm'
import RiderForm from './RiderForm'
import Nav from './Nav'
import { connect } from 'react-redux'
import wheelGif from '../images/wheel-gif.gif'


//sign up component 
const SignUp = (props) => {

  function handleUserType(e){
    props.selectUserType(e.target.value)
  }
  return (
  <div className="login-background">
    <Nav history={props.history}/>
    <span>
      <h1 className="logo-login-white">CYCLE SOURCE</h1>
    </span>
    <RiderForm history={props.history}/>
  </div>
  )
}

const mapStateToProps = state => {
  return {
    newUserType: state.newUserType
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    selectUserType: (value) => dispatch({ type: "SET_NEW_USER_TYPE", payload: value})
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(SignUp)
