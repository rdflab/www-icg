import React from "react"

const HideSmall = ({ children, size, show, className, style }) => {
  if (show) {
    return (
      <div className={`${size}:hidden ${className}`} style={style}>
        {children}
      </div>
    )
  } else {
    return (
      <div className={`hidden ${size}:block ${className}`} style={style}>
        {children}
      </div>
    )
  }
}

HideSmall.defaultProps = {
  className: "",
  style: {},
  size: "md",
  show: false,
}

export default HideSmall
