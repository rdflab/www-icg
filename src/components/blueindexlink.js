import React from "react"
import IndexLink from "./indexlink"

const BlueIndexLink = ({ to, children }) => (
  <IndexLink color="blue" to={to}>
    {children}
  </IndexLink>
)

export default BlueIndexLink
