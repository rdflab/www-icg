import React from "react"
import IconLink from "./iconlink"
import BlueLink from "./bluelink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MembersLink = ({ to }) => (
  <IconLink
    icon={<FontAwesomeIcon icon="users" className={`text-${color} text-xl`} />}
    content={<BlueLink to={to}>View Lab Members</BlueLink>}
  />
)

export default MembersLink
