import React from "react"
import { FaGlobeAmericas } from "react-icons/fa"
import IconLink from "./iconlink"
import WhiteLinkExt from "./whitelinkext"
import ColorLinkExt from "./colorlinkext"

const URLLink = ({ url, color }) => (
  <IconLink
    icon={<FaGlobeAmericas className={`text-${color}`} size={20} />}
    content={
      color === "white" ? (
        <WhiteLinkExt to={`${url[1]}`}>{url[0]}</WhiteLinkExt>
      ) : (
        <ColorLinkExt color={color} to={`${url[1]}`}>
          {url[0]}
        </ColorLinkExt>
      )
    }
  />
)

URLLink.defaultProps = {
  color: "gray",
}

export default URLLink
