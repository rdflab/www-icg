import React from "react"
import { FaNewspaper } from "react-icons/fa"
import RightSideIconLink from "./rightsideiconlink"
import { Link } from "gatsby"

const PublicationsLink = ({ to }) => (
  <div>
    <RightSideIconLink>
      <FaNewspaper />
    </RightSideIconLink>{" "}
    <Link to={to}>View Publications</Link>
  </div>
)

export default PublicationsLink
