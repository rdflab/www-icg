import React from "react"

const ColorLinkExt = ({ to, children, target, color }) => (
  <a className={`${color}-link`} href={to} target={target}>
    {children}
  </a>
)

ColorLinkExt.defaultProps = {
  target: "",
  color: "black",
}

export default ColorLinkExt
