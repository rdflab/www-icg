import React from "react"
import ColorLink from "./colorlink"

const GrayLink = ({ to, children, className, activeClassName }) => (
  <ColorLink
    color="gray-link"
    to={to}
    className={className}
    activeClassName={activeClassName}
  >
    {children}
  </ColorLink>
)

GrayLink.defaultProps = {
  className: "",
  activeClassName: "",
}

export default GrayLink
