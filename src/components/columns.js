import React from "react"

// <div
//   className={`columns is-marginless is-paddingless ${
//     isVCentered ? "is-vcentered" : ""
//   } ${className}`}
//   onClick={onClick}
// >

const Columns = ({ children, className, isMobile, isVCentered, onClick }) => (
  <div
    className={`flex ${isMobile ? "flex-row" : "flex-col sm:flex-row"} ${
      isVCentered ? "items-center" : ""
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
