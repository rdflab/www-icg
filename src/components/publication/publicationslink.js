import React from "react"
import { FaNewspaper } from "react-icons/fa"
import IconLink from "../iconlink"
import BlueLink from "../bluelink"

const PublicationsLink = ({ to }) => (
  <IconLink
    icon={<FaNewspaper className="text-gray-600" size={20} />}
    content={<BlueLink to={to}>View Publications</BlueLink>}
  />
)

export default PublicationsLink
