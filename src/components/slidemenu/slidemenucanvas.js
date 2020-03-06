import React from "react"

const SlideMenuCanvas = ({ onClickHandle, visible }) => (
  <div
    className={`slide-menu-canvas ${
      visible ? "slide-menu-canvas-visible" : ""
    }`}
    onClick={onClickHandle}
  />
)

export default SlideMenuCanvas
