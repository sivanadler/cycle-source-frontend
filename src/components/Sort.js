import React from "react"

const Sort = (props) => {
  return (
  <div className="sort">
    <select>
      <option value="" selected disabled hidden>Choose To Sort</option>
      <option value="rating-descending">Rating High To Low</option>
      <option value="rating-ascending">Rating Low To High</option>
    </select>
  </div>
  )
}

export default Sort
