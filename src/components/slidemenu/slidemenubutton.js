import React from "react"
import { FaBars } from "react-icons/fa"

const SlideMenuButton = ({ onClickHandle }) => (
  <button
    onClick={onClickHandle}
    className="mr-3 outline-none focus:outline-none"
  >
    <FaBars />
  </button>
)

export default SlideMenuButton
