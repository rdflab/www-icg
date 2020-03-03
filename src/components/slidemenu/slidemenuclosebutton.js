import React from "react"
import { FaTimes } from "react-icons/fa"

const SlideMenuCloseButton = ({ onClickHandle }) => (
  <button
    className="p-4 m-0 no-padding bg-transparent text-white opacity-75 hover:opacity-100 float-left cursor-pointer trans-ani"
    onClick={onClickHandle}
  >
    <FaTimes size={28} />
  </button>
)

export default SlideMenuCloseButton
