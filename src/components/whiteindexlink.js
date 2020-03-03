import React from "react"
import IndexLink from "./indexlink"

const WhiteIndexLink = ({ to, children }) => (
  <IndexLink color="white-link" to={to}>
    {children}
  </IndexLink>
)

export default WhiteIndexLink
