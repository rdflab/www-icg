import React from "react"
import IndexLink from "./indexlink"

const TextIndexLink = ({ to, children }) => (
  <IndexLink color="text" to={to}>
    {children}
  </IndexLink>
)

export default TextIndexLink
