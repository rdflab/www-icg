import React from "react"
import { FaEnvelope } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLinkExt from "./bluelinkext"
import WhiteLinkExt from "./whitelistext"

const EmailLink = ({ to }) => (
  <IconLink
    icon={<FaEnvelope className="text-white" size={20} />}
    content={<WhiteLinkExt to={`mailto:${to}`}>{to}</WhiteLinkExt>}
  />
)

export default EmailLink
