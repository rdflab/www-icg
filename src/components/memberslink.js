import React from "react"
import { FaUsers } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"
import { Link } from "gatsby"

const MembersLink = ({ to }) => (
  <div>
    <RightSideIconLink><FaUsers /></RightSideIconLink> <Link to={to}>View Lab Members</Link>
  </div>
)

export default MembersLink
