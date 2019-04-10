import React from "react";

class InstructorProfile extends React.Component {

  render() {
    console.log(this.props.instructor)
    return (
      <span>
        {
          this.props.instructor
          ?
          <div className="instructor-profile">
            <span className="instructor-pic-span">
              <img src="https://instructors.flywheelsports.com/510/Emily_Fayette_dfac98143c2a4f45b3d9e8b5f272feb950e141f7.jpg" alt="profile-picture" className="instructor-pic2"/>
              <span className="instructor-info">
              <p><strong>Username:</strong> {this.props.instructor.username}</p>
              <p><strong>Home Town: </strong> {this.props.instructor.hometown}</p>
              <p><strong>Fun Fact:</strong> {this.props.instructor.fun_fact}</p>
              <p><strong>Teaching Style: </strong> {this.props.instructor.teaching_style}</p>
              </span>
            </span>

          </div>
          :
          null
        }
      </span>
    )
  }
}
export default InstructorProfile
