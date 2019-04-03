import React from "react"
import HamburgerNav from './HamburgerNav'
import ProfileInformation from './ProfileInformation'
import ProfileDetails from './ProfileDetails'

const ProfileContainer = (props) => {
  return (
    <div className="">
      <HamburgerNav />
      <h1 className="search-header">CYCLE SOURCE</h1>
      <ProfileInformation />
      <ProfileDetails />
    </div>
  )
}

export default ProfileContainer
