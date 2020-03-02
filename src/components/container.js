import React from "react"

const Container = ({ children, className }) => (
  <div className={`container mx-auto ${className}`}>{children}</div>
)

Container.defaultProps = {
  className: "",
}

export default Container
