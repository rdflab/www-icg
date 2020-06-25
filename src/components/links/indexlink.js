import React, { useState } from "react"
import ColorLink from "./colorlink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IndexLink = ({ color, to, children }) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  let chevronColor

  switch (color) {
    case "red":
      chevronColor = "text-red-500"
      break
    case "blue":
      chevronColor = "text-blue"
      break
    case "white":
      chevronColor = "text-white"
      break
    default:
      chevronColor = "text"
      break
  }

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <ColorLink color={color} to={to}>
        {children}
      </ColorLink>
      <FontAwesomeIcon
        icon="chevron-right"
        className={`${chevronColor} inline align-center text-xl trans-ani ml-2`}
      />
    </div>
  )
}

export default IndexLink
