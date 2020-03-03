import React from "react"

// <div
//   className={`column is-marginless is-paddingless is-${w} ${className}`}
//   style={style}
//   onClick={onClick}
// >

const Column = ({ children, w, isMobile, className, style, onClick }) => {
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
  style: {},
}

export default Column
