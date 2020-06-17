import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SlideMenuButton = ({ onClick }) => (
  <button
    aria-label="Open Menu"
    onClick={onClick}
    className="mr-3 border-none outline-none focus:outline-none cursor-pointer bg-transparent text-white"
  >
    <FontAwesomeIcon icon="bars" className={`text-lg`} />
  </button>
)

export default SlideMenuButton
