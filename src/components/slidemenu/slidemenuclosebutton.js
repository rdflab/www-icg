import React from "react"
import { FaTimes } from "react-icons/fa"

const SlideMenuCloseButton = ({ onClickHandle }) => (
  <button
    aria-label="Close"
    className="row items-center justify-center no-padding h-6 w-6 text-white-80 hover:text-white cursor-pointer trans-ani"
    onClick={onClickHandle}
  >
    <FaTimes size={20} />
  </button>
)

export default SlideMenuCloseButton
