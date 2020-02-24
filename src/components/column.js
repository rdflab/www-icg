import React from "react"

const Column = ({ children, w, className, onClick }) => (
  <div
    className={`column ${w !== "" ? `is-${w}` : ""} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

Column.defaultProps = {
  w: "",
  className: "",
}

export default Column
