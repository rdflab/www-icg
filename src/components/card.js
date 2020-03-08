import React from "react"

const Card = ({ children, padding, className }) => (
  <div
    class={`bg-white shadow-md rounded-md ${padding} overflow-hidden ${className}`}
  >
    {children}
  </div>
)

Card.defaultProps = {
  className: "",
  padding: "p-4",
}

export default Card
