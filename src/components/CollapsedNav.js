import React from "react"
import { connect } from 'react-redux'

const CollapsedNav = (props) => {
  return (
  <div className="hamburger" onClick={props.handleToggleHamburgerNav}>
    <div className="collapsed-nav" ></div>
    <div className="collapsed-nav" ></div>
    <div className="collapsed-nav" ></div>
  </div>
  )
}

export default CollapsedNav
