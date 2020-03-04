import React from "react"
import { FaUsers } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLink from "./bluelink"

const MembersLink = ({ to }) => (
  <IconLink
    icon={<FaUsers className="text-gray-600" size={24} />}
    content={<BlueLink to={to}>View Lab Members</BlueLink>}
  />
)

export default MembersLink
