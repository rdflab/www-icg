import React from "react"
import IconLink from "./iconlink"
import ColorLinkExt from "./colorlinkext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PhoneLink = ({ phone, color }) => (
  <IconLink
    icon={<FontAwesomeIcon icon="phone" className={`text-${color} text-xl`} />}
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
