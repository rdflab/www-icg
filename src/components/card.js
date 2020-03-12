import React from "react"

const Card = ({ children, padding, className }) => (
  <div className={`card ${className}`}>{children}</div>
)

Card.defaultProps = {
  className: "",
  padding: "p-4",
}

export default Card
