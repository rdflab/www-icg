import React from "react"

const H1 = ({ children, className }) => (
  <h1 className={`text-center uppercase my-8 ${className}`}>{children}</h1>
)

H1.defaultProps = {
  className: "",
}

export default H1
