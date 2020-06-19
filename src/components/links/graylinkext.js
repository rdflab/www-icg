import React from "react"
import ColorLinkExt from "./colorlinkext"

const GrayLinkExt = ({ to, children, target }) => (
  <ColorLinkExt color="gray" to={to} target={target}>
    {children}
  </ColorLinkExt>
)

GrayLinkExt.defaultProps = {
  target: "_blank",
}

export default GrayLinkExt
