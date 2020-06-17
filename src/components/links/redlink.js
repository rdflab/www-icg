import React from "react"
import ColorLink from "./colorlink"

const RedLink = ({ to, children, className, activeClassName }) => (
  <ColorLink
    color="red"
    to={to}
    className={className}
    activeClassName={activeClassName}
  >
    {children}
  </ColorLink>
)

RedLink.defaultProps = {
  className: "",
  activeClassName: "",
}

export default RedLink
