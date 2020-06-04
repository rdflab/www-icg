import React from "react"
import IconLink from "./iconlink"
import WhiteLinkExt from "./whitelinkext"
import ColorLinkExt from "./colorlinkext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const URLLink = ({ url, color }) => (
  <IconLink
    icon={
      <FontAwesomeIcon
        icon="globe-americas"
        className={`text-${color} text-xl`}
      />
    }
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
