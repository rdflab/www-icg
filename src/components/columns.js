import React from "react"

const Columns = ({ children, className, isMobile, onClick }) => (
  <div
    className={`flex ${
      isMobile ? "flex-row" : "flex-col sm:flex-row"
    }  ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

Columns.defaultProps = {
  className: "",
  isMobile: false,
}

export default Columns
