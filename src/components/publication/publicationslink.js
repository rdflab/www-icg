import React from "react"
import IconLink from "../iconlink"
import BlueLink from "../bluelink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PublicationsLink = ({ to, color }) => (
  <IconLink
    icon={
      <FontAwesomeIcon icon="newspaper" className={`text-${color} text-xl`} />
    }
    content={<BlueLink to={to}>View Publications</BlueLink>}
  />
)

PublicationsLink.defaultProps = {
  color: "black",
}

export default PublicationsLink
