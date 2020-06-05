import React from "react"

const DropShadowFrame = ({ children, className }) => (
  <div
    className={`bg-white shadow-md hover:shadow-lg trans-ani overflow-hidden ${className}`}
  >
    {children}
  </div>
)

DropShadowFrame.defaultProps = {
  className: "",
}

export default DropShadowFrame
