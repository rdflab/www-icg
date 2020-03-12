import React from "react"

const Card = ({ children, padding, className }) => (
  <div
    className={`bg-white border border-solid border-gray-100 shadow-md rounded-md ${padding} overflow-hidden ${className}`}
  >
    {children}
  </div>
)

Card.defaultProps = {
  className: "",
  padding: "p-4",
}

export default Card
