import React from "react"
import { FaTimes } from "react-icons/fa"

const SlideMenuCloseButton = ({ onClickHandle }) => (
  <button
    aria-label="Close"
    className="p-1 m-0 no-padding bg-gray-400 rounded-full text-white hover:bg-gray-500 cursor-pointer trans-ani"
    onClick={onClickHandle}
  >
    <FaTimes size={16} />
  </button>
)

export default SlideMenuCloseButton
