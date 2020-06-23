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
    className={`relative trans-ani rounded-lg  ${
      showCard
        ? "bg-white border border-solid border-gray-300 hover:shadow"
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
