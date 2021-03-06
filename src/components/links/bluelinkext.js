import React from "react"
import ColorLinkExt from "./colorlinkext"

const BlueLinkExt = ({ to, children, target }) => (
  <ColorLinkExt color="blue" to={to} target={target}>
    {children}
  </ColorLinkExt>
)

BlueLinkExt.defaultProps = {
  target: "_blank",
}

export default BlueLinkExt
