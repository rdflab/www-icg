import React from "react"
import LinkExt from "./linkext"

const ColorLinkExt = ({ to, children, target, color }) => (
  <LinkExt className={`${color}-link`} to={to} target={target}>
    {children}
  </LinkExt>
)

ColorLinkExt.defaultProps = {
  target: "_blank",
  color: "black",
}

export default ColorLinkExt
