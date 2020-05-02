import React from "react"
import { FaTimes } from "react-icons/fa"

const SlideMenuCloseButton = ({ onClick }) => (
  <button
    aria-label="Close"
    className="row items-center justify-center no-padding h-6 w-6 text-gray-400 hover:text-blue-500 cursor-pointer trans-ani"
    onClick={onClick}
  >
    <FaTimes size={20} />
  </button>
)

export default SlideMenuCloseButton
