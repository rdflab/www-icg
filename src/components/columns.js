import React from "react"

const Columns = ({ children, className, isMobile, isVCentered, onClick }) => (
  // <div
  //   className={`flex ${
  //     isMobile ? "flex-row" : "flex-col sm:flex-row"
  //   }  ${className}`}
  //   onClick={onClick}
  // >
  <div
    className={`columns is-marginless is-paddingless ${
      isVCentered ? "is-vcentered" : ""
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
)

Columns.defaultProps = {
  className: "",
  isMobile: false,
  isVCentered: false,
}

export default Columns
