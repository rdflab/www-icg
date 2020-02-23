import React from "react"

const Column = ({ children, w }) => (
  <div className={`column ${w !== "" ? `is-${w}` : ""}`}>{children}</div>
)

Column.defaultProps = {
  w: "",
}

export default Column
