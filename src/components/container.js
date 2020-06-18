import React from "react"

const Container = ({ children, className, style }) => (
  // <div className={`container px-4 mx-auto ${className}`} style={style}>
  //   {children}
  // </div>
  <div
    className={`mx-4 md:mx-20 xl:mx-40 2xl:mx-56 ${className}`}
    style={style}
  >
    {children}
  </div>
)

Container.defaultProps = {
  className: "",
  style: null,
}

export default Container
