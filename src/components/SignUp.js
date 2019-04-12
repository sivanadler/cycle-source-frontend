import React from "react"
import InstructorForm from './InstructorForm'
import RiderForm from './RiderForm'
import Nav from './Nav'
import { connect } from 'react-redux'
import wheelGif from '../images/wheel-gif.gif'

const SignUp = (props) => {

  function handleUserType(e){
    props.selectUserType(e.target.value)
  }
  console.log(props)
  return (
  <div className="sign-up">
    <Nav history={props.history}/>
    <span>
      <h1 className="logo">CYCLE SOURCE</h1>
    </span>
    <span>
      <img className="wheel-gif" src={wheelGif} alt="spinny wheel" />
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
