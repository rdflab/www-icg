import React from "react"

const Row = ({ children, className }) => (
  <div className={`row ${className}`}>{children}</div>
)

Row.defaultProps = {
  className: "",
}

export default Row
