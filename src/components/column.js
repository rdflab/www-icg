import React from "react"

const Column = ({ children, w, className }) => (
  <div className={`column ${w !== "" ? `is-${w}` : ""} ${className}`}>
    {children}
  </div>
)

Column.defaultProps = {
  w: "",
  className: "",
}

export default Column
