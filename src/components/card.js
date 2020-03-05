import React from "react"

const Card = ({ children, className }) => (
  <div class={`bg-white shadow-lg rounded p-4 ${className}`}>{children}</div>
)

Card.defaultProps = {
  className: "",
}

export default Card
