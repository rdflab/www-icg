import React from "react"

const FullDiv = ({ children, className }) => (
  <div className={`w-full ${className}`}>{children}</div>
)

FullDiv.defaultProps = {
  className: "",
}

export default FullDiv
