import React from "react"
import { Link } from "gatsby"

const ColorLink = ({ color, to, children }) => (
  <Link to={to} className={`${color}-link`}>
    {children}
  </Link>
)

export default ColorLink
