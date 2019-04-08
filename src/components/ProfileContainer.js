import React from "react"
import HamburgerNav from './HamburgerNav'
import ProfileInformation from './ProfileInformation'
import ProfileDetails from './ProfileDetails'
import Header from './Header'

const ProfileContainer = (props) => {
  return (
    <div className="">
      <span>
        <HamburgerNav />
      </span>
      <span>
        <Header />
      </span>
      <h1 className="search-header">CYCLE SOURCE</h1>
      <ProfileInformation history={props.history}/>
      <ProfileDetails history={props.history}/>
    </div>
  )
}

export default ProfileContainer
