import React from "react"
import { FaUsers } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"
import { Link } from "gatsby"
import BodyLink from "./bodylink"

const MembersLink = ({ to }) => (
  <div>
    <RightSideIconLink>
      <FaUsers />
    </RightSideIconLink>{" "}
    <BodyLink to={to}>View Lab Members</BodyLink>
  </div>
)

export default MembersLink
