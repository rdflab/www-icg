import React from "react"
import { FaPhone } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLinkExt from "./bluelinkext"
import WhiteLinkExt from "./whitelistext"

const PhoneLink = ({ numbers }) => (
  <IconLink
    icon={<FaPhone className="text-white" size={20} />}
    content={<WhiteLinkExt to={`tel:${numbers[0]}`}>{numbers[0]}</WhiteLinkExt>}
  />
)

export default PhoneLink
