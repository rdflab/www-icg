import React from "react"

const Container = ({ children, className }) => (
  // <div className={`container px-4 mx-auto ${className}`}>{children}</div>
  <div className={`container ${className}`}>{children}</div>
)

Container.defaultProps = {
  className: "",
}

export default Container
