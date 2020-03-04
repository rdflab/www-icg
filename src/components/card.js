import React from "react"

const Card = ({ children, className }) => (
  <div class={`shadow-lg rounded p-4 ${className}`}>{children}</div>
)

Card.defaultProps = {
  className: "",
}

export default Card
