import React from "react"

const H1 = ({ children, className, style }) => (
  <h1 className={`text-center mb-8 ${className}`} style={style}>
    {children}
  </h1>
)

H1.defaultProps = {
  className: "",
  style: {},
}

export default H1
