import React from "react"
import ColorLinkExt from "./colorlinkext"

const WhiteLinkExt = ({ to, children, target }) => (
  <ColorLinkExt color="white" href={to} target={target}>
    {children}
  </ColorLinkExt>
)

WhiteLinkExt.defaultProps = {
  target: "",
}

export default WhiteLinkExt
