import React from "react"

const H2 = ({ children, className }) => (
  <h2 className={`mb-8 text-center ${className}`}>{children}</h2>
)

H2.defaultProps = {
  className: "",
}

export default H2
