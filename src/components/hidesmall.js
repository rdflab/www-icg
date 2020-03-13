import React from "react"

const HideSmall = ({ children, size, show, className }) => {
  if (show) {
    return <div className={`${size}:hidden ${className}`}>{children}</div>
  } else {
    return <div className={`hidden ${size}:block ${className}`}>{children}</div>
  }
}

HideSmall.defaultProps = {
  className: "",
  size: "md",
  show: false,
}

export default HideSmall
