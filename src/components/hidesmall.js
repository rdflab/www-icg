import React from "react"

const HideSmall = ({ children, size, className }) => (
  <div className={`hidden ${size}:block ${className}`}>{children}</div>
)

HideSmall.defaultProps = {
  className: "",
  size: "sm",
}

export default HideSmall
