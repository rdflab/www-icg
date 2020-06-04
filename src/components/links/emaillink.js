import React from "react"
import IconLink from "./iconlink"
import ColorLinkExt from "./colorlinkext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const EmailLink = ({ to, color }) => (
  <IconLink
    icon={
      <FontAwesomeIcon icon="envelope" className={`text-${color} text-xl`} />
    }
    content={
      <ColorLinkExt color={color} to={`mailto:${to}`}>
        {to}
      </ColorLinkExt>
    }
  />
)

EmailLink.defaultProps = {
  color: "black",
}

export default EmailLink
