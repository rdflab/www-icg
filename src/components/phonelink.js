import React from "react"
import { FaPhone } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLinkExt from "./bluelinkext"
import WhiteLinkExt from "./whitelistext"

const PhoneLink = ({ phone }) => (
  <IconLink
    icon={<FaPhone className="text-white" size={20} />}
    content={<WhiteLinkExt to={`tel:${phone}`}>{phone}</WhiteLinkExt>}
  />
)

export default PhoneLink
