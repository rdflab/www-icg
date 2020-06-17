import React from "react"
import ColorLink from "./colorlink"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IndexLink = ({ color, to, children }) => {
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
    <>
      <ColorLink color={color} to={to}>
        {children}
      </ColorLink>
      <FontAwesomeIcon
        icon="chevron-right"
        className={`${chevronColor} inline align-center ml-1 text-xl`}
      />
    </>
  )
}

export default IndexLink
