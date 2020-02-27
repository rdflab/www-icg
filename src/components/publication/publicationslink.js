import React from "react"
import { FaNewspaper } from "react-icons/fa"
import RightSideIconLink from "../rightsideiconlink"
import { Link } from "gatsby"
import LinkBlock from "../linkblock"

const PublicationsLink = ({ to }) => (
  <LinkBlock>
    <RightSideIconLink>
      <FaNewspaper />
    </RightSideIconLink>
    <Link to={to}>View Publications</Link>
  </LinkBlock>
)

export default PublicationsLink
