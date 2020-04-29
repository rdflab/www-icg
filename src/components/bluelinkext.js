import React from "react"
import ColorLinkExt from "./colorlinkext"

const BlueLinkExt = ({ to, children, target }) => (
  <ColorLinkExt color="blue" href={to} target={target}>
    {children}
  </ColorLinkExt>
)

BlueLinkExt.defaultProps = {
  target: "",
}

export default BlueLinkExt
