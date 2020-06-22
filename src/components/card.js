import React from "react"

const Card = ({ children, className }) => (
  <div
    className={`relative trans-ani rounded-lg overflow-hidden w-full bg-white shadow hover:shadow-md ${className}`}
  >
    {children}
  </div>
)

Card.defaultProps = {
  className: "",
}

export default Card
