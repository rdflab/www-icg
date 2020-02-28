import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"

const URLLink = ({ urls }) => (
  <div>
    <RightSideIconLink>
      <FaGlobeAmericas />
    </RightSideIconLink>{" "}
    <a href={`${urls[0]}`}>{urls[0]}</a>
  </div>
)

export default URLLink
