import React from "react"

const Columns = ({ children, className, onClick }) => (
  <div className={`columns ${className}`} onClick={onClick}>
    {children}
  </div>
)

Columns.defaultProps = {
  className: "",
}

export default Columns
