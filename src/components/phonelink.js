import React from "react"
import { FaPhone } from "react-icons/fa"
import IconLink from "./iconlink"
import ColorLinkExt from "./colorlinkext"

const PhoneLink = ({ phone, color }) => (
  <IconLink
    icon={<FaPhone className={`text-${color}`} size={20} />}
    content={
      <ColorLinkExt color={color} to={`tel:${phone}`}>
        {phone}
      </ColorLinkExt>
    }
  />
)

PhoneLink.defaultProps = {
  color: "black",
}

export default PhoneLink
