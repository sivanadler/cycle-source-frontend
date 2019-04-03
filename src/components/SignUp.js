import React from "react"
import InstructorForm from './InstructorForm'
import RiderForm from './RiderForm'
import { connect } from 'react-redux'


const SignUp = (props) => {

  function handleUserType(e){
    props.selectUserType(e.target.value)
  }

  return (
  <div className="sign-up">
    <select onChange={handleUserType}>
      <option value="" selected disabled hidden>Select Account Type</option>
      <option value="Rider">Rider</option>
      <option value="Instructor">Instructor</option>
    </select>
    {props.newUserType === "Rider"
      ?
      <RiderForm />
      :
      null
    }
    {props.newUserType === "Instructor"
      ?
      <InstructorForm />
      :
      null
    }
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
