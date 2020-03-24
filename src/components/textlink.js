import React from "react"
import ColorLink from "./colorlink"

const TextLink = ({ to, children, className, activeClassName }) => (
  <ColorLink
    color="text"
    to={to}
    className={className}
    activeClassName={activeClassName}
  >
    {children}
  </ColorLink>
)

TextLink.defaultProps = {
  className: "",
  activeClassName: "",
}

export default TextLink
