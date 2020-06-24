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
    className={`relative trans-ani rounded-md ${
      showCard
        ? " bg-white border border-solid border-gray-300 shadow hover:shadow-md"
        : ""
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
