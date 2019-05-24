import React from "react";
import ExposedNav from './ExposedNav'
import CollapsedNav from './CollapsedNav'

//this component is the parent to both exposed and collapsed nav

class HamburgerNav extends React.Component {
  state = {
    clicked: false
  }

  handleToggleHamburgerNav = () => {
    this.setState({
      clicked: !this.state.clicked
    })
  }

  render() {
    return (
      <div  className={this.state.clicked ? "ham-modal" : "unclicked"}>
        {this.state.clicked
          ?
          <ExposedNav
            handleToggleHamburgerNav={this.handleToggleHamburgerNav}
          />
          :
          <CollapsedNav
            handleToggleHamburgerNav={this.handleToggleHamburgerNav}
          />
        }

      </div>
    )
  }
}
export default HamburgerNav
