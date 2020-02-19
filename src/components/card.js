import React from "react"
import cardStyles from "./card.module.scss"

const Card = ({children}) => (
  <div className={cardStyles.card}>
    {children}
  </div>
)

export default Card
