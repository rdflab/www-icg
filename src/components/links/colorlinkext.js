import React from "react"
import ExtLink from "./extlink"

const ColorLinkExt = ({ to, children, target, color }) => (
  <ExtLink className={`${color}-link`} to={to} target={target}>
    {children}
  </ExtLink>
)

ColorLinkExt.defaultProps = {
  target: "_blank",
  color: "black",
}

export default ColorLinkExt
