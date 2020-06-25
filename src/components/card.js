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
    className={`relative trans-ani  ${
      showCard ? " bg-white shadow-lg rounded-xl" : ""
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
