import React from "react"
import { FaPhone } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLinkExt from "./bluelinkext"

const PhoneLink = ({ numbers }) => (
  <IconLink
    icon={<FaPhone className="text-gray-600" size={20} />}
    content={<BlueLinkExt to={`tel:${numbers[0]}`}>{numbers[0]}</BlueLinkExt>}
  />
)

export default PhoneLink
