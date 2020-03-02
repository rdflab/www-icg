import React from "react"
import { Link } from "gatsby"

const SlideMenuLink = ({ to, children }) => (
  <Link className="slide-menu-link" to={to}>
    {children}
  </Link>
)

export default SlideMenuLink
