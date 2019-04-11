import React from "react";
import HamburgerNav from './HamburgerNav'
import Header from './Header'
import { connect } from 'react-redux'
import SpinClassAdapter from '../apis/SpinClassAdapter'
import SpinClassCard from './SpinClassCard'
class ClassLists extends React.Component {
  state = {
    spinClasses: [],
  }

  renderSpinClasses = () => {
    if (this.props.currentUser) {
      let myClasses = this.state.spinClasses.filter(spinClass => spinClass.instructor_id === this.props.currentUser.id)
      return myClasses.map(spinClass => {
        return <SpinClassCard spinClass={spinClass}/>
      })
    }
  }

  componentDidMount(){
    this.getCurrentUser()
    SpinClassAdapter.getSpinClasses()
    .then(spinClasses => {
      this.setState({ spinClasses})
    })
  }

  getCurrentUser = () => {
    const jwtInstructor = localStorage.getItem('jwtInstructor')
    fetch("http://localhost:3000/api/v1/instructor_auto_login", {
      headers: {
        "Authorization": jwtInstructor
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.errors) {
          alert(response.errors)
        } else {
          this.props.setCurrentUser(response.instructor)
        }
      })
  }

  render() {
    console.log(this.state.spinClasses)
    return (
      <div>
      <span>
        <HamburgerNav />
      </span>
      <span>
        <Header currentUserGiver={this.giveMeCurrentUser}/>
      </span>
      <h1 className="search-header">CYCLE SOURCE</h1>
      <br/>
      <div className="class-cards-container">
        {this.state.spinClasses.length !== 0 ? this.renderSpinClasses() : null}
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    spinClasses: state.spinClasses
  }
}

const mapDispatchtoProps = dispatch => {
  return{
    setCurrentUser: (user) => dispatch({ type: "SET_CURRENT_USER", payload: user}),
  }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ClassLists)
