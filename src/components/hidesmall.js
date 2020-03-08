import React from "react"

const HideSmall = ({ children, className }) => (
  <div className={`hidden sm:block ${className}`}>{children}</div>
)

HideSmall.defaultProps = {
  className: "",
}

export default HideSmall
