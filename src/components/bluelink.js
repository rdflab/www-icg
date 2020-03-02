import React from "react"
import ColorLink from "./colorlink"

const BlueLink = ({ to, children }) => (
  <ColorLink color="blue" to={to}>
    {children}
  </ColorLink>
)

export default BlueLink
