import React from "react"
import { FaBars } from "react-icons/fa"

const SlideMenuButton = ({ onClickHandle }) => (
  <button
    aria-label="Open Menu"
    onClick={onClickHandle}
    className="mr-3 border-none outline-none focus:outline-none cursor-pointer bg-transparent text-columbia-blue-80"
  >
    <FaBars />
  </button>
)

export default SlideMenuButton
