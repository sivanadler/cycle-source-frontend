import React from "react";

class InstructorProfile extends React.Component {

  render() {
    return (
      <div>
        {
          this.props.instructor
          ?
          <div className="instructor-profile">
            <div>
              <h1 className="header"> ABOUT ME</h1>
            </div>
            <div className="instructor-pic-span">
              <img src={this.props.instructor.profile_pic} className="instructor-pic2"/>
            </div>
            <div className="instructor-info">
              <strong className="strong">TEACHING STYLE:</strong> <p>{this.props.instructor.teaching_style}</p>
              <strong className="strong">HOME TOWN: </strong> <p>{this.props.instructor.hometown}</p>
              <strong className="strong">FUN FACT:</strong> <p>{this.props.instructor.fun_fact}</p>
            </div>
          </div>
          :
          null
        }
      </div>
    )
  }
}
export default InstructorProfile
