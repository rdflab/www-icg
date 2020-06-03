import React from "react"
import ExtLink from "./extlink"

const ColorLinkExt = ({ to, children, target, color }) => (
  <ExtLink className={`${color}-link`} to={to} target={target}>
    {children}
  </ExtLink>
)

ColorLinkExt.defaultProps = {
  target: "",
  color: "black",
}

export default ColorLinkExt
