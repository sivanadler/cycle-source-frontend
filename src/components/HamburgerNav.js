import React from "react";
import ExposedNav from './ExposedNav'
import CollapsedNav from './CollapsedNav'

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
      <div>
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