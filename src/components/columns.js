import React from "react"

const Columns = ({ children, className, onClick }) => (
  <div className={`flex flex-col md:flex-row  ${className}`} onClick={onClick}>
    {children}
  </div>
)

Columns.defaultProps = {
  className: "",
}

export default Columns
