import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SlideMenuCloseButton = ({ onClick }) => (
  <button
    aria-label="Close"
    className="row items-center justify-center no-padding h-6 w-6 text-gray-400 hover:text-blue-500 cursor-pointer trans-ani"
    onClick={onClick}
  >
    <FontAwesomeIcon icon="times" className={`text-lg`} />
  </button>
)

export default SlideMenuCloseButton
