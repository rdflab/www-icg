import React from "react"
import ColorLink from "./colorlink"

const BlueLink = ({ to, children, className, activeClassName }) => (
  <ColorLink
    color="blue"
    to={to}
    className={className}
    activeClassName={activeClassName}
  >
    {children}
  </ColorLink>
)

BlueLink.defaultProps = {
  className: "",
  activeClassName: "",
}

export default BlueLink
