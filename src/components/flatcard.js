import React from "react"

const FlatCard = ({ children, className }) => (
  <div className={`flatcard ${className}`}>{children}</div>
)

FlatCard.defaultProps = {
  className: "",
}

export default FlatCard
