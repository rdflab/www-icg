import React from "react"

const Container = ({ children, className, style }) => (
  <div className={`container px-4 mx-auto ${className}`} style={style}>
    {children}
  </div>
  //<div className={`container ${className}`}>{children}</div>
)

Container.defaultProps = {
  className: "",
  style: null,
}

export default Container
