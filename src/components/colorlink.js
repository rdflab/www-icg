import React from "react"
import { Link } from "gatsby"

const ColorLink = ({ color, to, children, className, activeClassName }) => (
  <Link
    to={to}
    className={`${color} ${className}`}
    activeClassName={activeClassName}
  >
    {children}
  </Link>
)

ColorLink.defaultProps = {
  className: "",
  activeClassName: "",
}

export default ColorLink
