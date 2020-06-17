import React from "react"

const SlideMenuCanvas = ({ onClick, visible }) => (
  <div
    className={`slide-menu-canvas ${
      visible ? "slide-menu-canvas-visible" : ""
    }`}
    onClick={onClick}
  />
)

export default SlideMenuCanvas
