import React from "react"

const FlatCard = ({ children, className }) => (
  <div
    className={`w-full bg-white border border-solid border-gray-300 rounded-md px-4 py-2 overflow-hidden ${className}`}
  >
    {children}
  </div>
)

FlatCard.defaultProps = {
  className: "",
}

export default FlatCard
