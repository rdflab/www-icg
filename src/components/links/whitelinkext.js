import React from "react"
import ColorLinkExt from "./colorlinkext"

const WhiteLinkExt = ({ to, children, target }) => (
  <ColorLinkExt color="white" to={to} target={target}>
    {children}
  </ColorLinkExt>
)

WhiteLinkExt.defaultProps = {
  target: "_blank",
}

export default WhiteLinkExt
