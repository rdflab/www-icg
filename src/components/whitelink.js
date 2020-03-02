import React from "react"
import ColorLink from "./colorlink"

const WhiteLink = ({ to, children }) => (
  <ColorLink color="white-link" to={to}>
    {children}
  </ColorLink>
)

export default WhiteLink
