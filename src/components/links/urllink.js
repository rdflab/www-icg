import React from "react"
import IconLink from "./iconlink"
import WhiteLinkExt from "./whitelinkext"
import ColorLinkExt from "./colorlinkext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const urlLink = (url, color) => {
  const tokens = url.split("::")

  let text
  let to

  if (tokens.length > 1) {
    text = tokens[0]
    to = tokens[1]
  } else {
    text = tokens[0]
    to = tokens[0]
  }

  if (color === "white") {
    return <WhiteLinkExt to={`${to}`}>{text}</WhiteLinkExt>
  } else {
    return (
      <ColorLinkExt color={color} to={`${to}`}>
        {text}
      </ColorLinkExt>
    )
  }
}

const URLLink = ({ url, color }) => (
  <IconLink
    icon={
      <FontAwesomeIcon
        icon="globe-americas"
        className={`text-${color} text-xl`}
      />
    }
    content={urlLink(url, color)}
  />
)

URLLink.defaultProps = {
  color: "gray",
}

export default URLLink
