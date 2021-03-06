import React from "react";
import InstructorAdapter from '../apis/InstructorAdapter'
import InstructorShowContainer from './InstructorShowContainer'
import { connect } from 'react-redux'

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      instructorShowContainer: null
    }
  }

  componentDidMount() {
    InstructorAdapter.getInstructors()
    .then(response=>{
      let pathNames = []
      response.map(res => {
        let pathname = res.name.toLowerCase().replace(" ", "_")
        pathNames.push(pathname)
      })
      this.setState({instructorShowContainer: pathNames })
    })
  }

  render (){
    const { instructorShowContainer } = this.state

    if ( instructorShowContainer ) {
      return <InstructorShowContainer history={this.props.history}/>
    }
    return (
      <div> </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps)(Wrapper)
