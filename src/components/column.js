import React from "react"

const Column = ({ children, w, isMobile, className, onClick }) => {
  let baseClass

  if (isMobile) {
    baseClass = w !== "" ? `w-${w}` : ""
  } else {
    baseClass = `w-full ${w !== "" ? `sm:w-${w}` : ""}`
  }

  return (
    <div className={`${baseClass} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

Column.defaultProps = {
  w: "",
  isMobile: false,
  className: "",
}

export default Column
