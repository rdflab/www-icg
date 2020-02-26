import React from "react"
import { FaNewspaper } from "react-icons/fa"
import RightSideIconLink from "../rightsideiconlink"
import BodyLink from "../bodylink"

const PublicationsLink = ({ to }) => (
  <div>
    <RightSideIconLink>
      <FaNewspaper />
    </RightSideIconLink>{" "}
    <BodyLink to={to}>View Publications</BodyLink>
  </div>
)

export default PublicationsLink
