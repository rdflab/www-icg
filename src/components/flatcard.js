import React from "react"

const FlatCard = ({ children, padding, className }) => (
  <div
    className={`bg-white border border-solid border-gray-300 rounded-md ${padding} overflow-hidden ${className}`}
  >
    {children}
  </div>
)

FlatCard.defaultProps = {
  className: "",
  padding: "px-4 py-2",
}

export default FlatCard
