import React from "react"
import { FaUsers } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"
import { Link } from "gatsby"
import BodyLink from "./bodylink"
import LinkBlock from "./linkblock"

const MembersLink = ({ to }) => (
  <LinkBlock>
    <RightSideIconLink>
      <FaUsers />
    </RightSideIconLink>
    <Link to={to}>View Lab Members</Link>
  </LinkBlock>
)

export default MembersLink
