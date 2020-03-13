import React from "react"

const Card = ({ children, padding, className }) => (
  <div className={`card ${className}`}>{children}</div>
)

Card.defaultProps = {
  className: "",
}

export default Card
