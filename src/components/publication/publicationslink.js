import React from "react"
import { FaNewspaper } from "react-icons/fa"
import { Link } from "gatsby"
import IconLink from "../iconlink"

const PublicationsLink = ({ to }) => (
  <IconLink
    icon={<FaNewspaper className="text-gray-600" />}
    content={<Link to={to}>View Publications</Link>}
  />
)

export default PublicationsLink
