import React from "react"

const Card = ({
  children,
  showCard,
  onMouseEnter,
  onMouseLeave,
  className,
}) => (
  <div
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`relative trans-ani rounded-lg overflow-hidden w-full ${
      showCard ? "bg-white shadow hover:shadow-md" : ""
    } ${className}`}
  >
    {children}
  </div>
)

Card.defaultProps = {
  className: "",
  showCard: true,
  onMouseEnter: null,
  onMouseLeave: null,
}

export default Card
