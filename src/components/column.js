import React from "react"

const Column = ({ children, w, isMobile, className, style, onClick }) => {
  // let baseClass

  // if (isMobile) {
  //   baseClass = w !== "" ? `w-${w}` : ""
  // } else {
  //   baseClass = `w-full ${w !== "" ? `sm:w-${w}` : ""}`
  // }

  return (
    // <div className={`${baseClass} ${className}`} onClick={onClick}>
    <div
      className={`column is-marginless is-paddingless is-${w} ${className}`}
      style={style}
      onClick={onClick}
    >
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
