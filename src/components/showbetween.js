import React from "react"

const ShowBetween = ({ children, s1, s2, className, style }) => (
  <div className={`hidden ${s1}:block ${s2}:hidden ${className}`} style={style}>
    {children}
  </div>
)

ShowBetween.defaultProps = {
  className: "",
  style: {},
  s1: "md",
  s2: "lg",
}

export default ShowBetween
