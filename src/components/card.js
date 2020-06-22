import React from "react"

const Card = ({ children, onMouseEnter, onMouseLeave, className }) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`relative trans-ani rounded-lg overflow-hidden w-full bg-white shadow hover:shadow-md ${className}`}
  >
    {children}
  </div>
)

Card.defaultProps = {
  className: "",
  onMouseEnter: null,
  onMouseLeave: null,
}

export default Card
