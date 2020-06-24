import React from "react"

const FlHdDiv = ({ children, className }) => (
  // <div className={`w-full pb-32 pt-40 lg:pt-56 ${className}`}>{children}</div>
  <div className={`w-full py-16`}>{children}</div>
)

FlHdDiv.defaultProps = {
  className: "",
}

export default FlHdDiv
