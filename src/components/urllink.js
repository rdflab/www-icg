import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import IconLink from "./iconlink"
import BlueLinkExt from "./bluelinkext"
import WhiteLinkExt from "./whitelinkext"

const URLLink = ({ url, color }) => (
  <IconLink
    icon={<FaGlobeAmericas className={`text-${color}`} size={20} />}
    content={
      color === "white" ? (
        <WhiteLinkExt to={`${url[1]}`}>{url[0]}</WhiteLinkExt>
      ) : (
        <BlueLinkExt to={`${url[1]}`}>{url[0]}</BlueLinkExt>
      )
    }
  />
)

URLLink.defaultProps = {
  color: "blue",
}

export default URLLink
