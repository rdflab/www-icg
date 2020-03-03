import React from "react"
import { FaBars } from "react-icons/fa"

const SlideMenuButton = ({ onClickHandle }) => (
  <button
    onClick={onClickHandle}
    className="mr-3 border-none outline-none cursor-pointer bg-transparent text-white"
  >
    <FaBars />
  </button>
)

export default SlideMenuButton
