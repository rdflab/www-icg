import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLinkExt from "./bluelinkext"

const URLLink = ({ url }) => (
  <IconLink
    icon={<FaGlobeAmericas className="text-gray-600" />}
    content={<BlueLinkExt to={`${url}`}>{url}</BlueLinkExt>}
  />
)

export default URLLink
