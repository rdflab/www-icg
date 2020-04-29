import React from "react"
import { FaEnvelope } from "react-icons/fa"
import IconLink from "./iconlink"
import ColorLinkExt from "./colorlinkext"

const EmailLink = ({ to, color }) => (
  <IconLink
    icon={<FaEnvelope className={`text-${color}`} size={20} />}
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
