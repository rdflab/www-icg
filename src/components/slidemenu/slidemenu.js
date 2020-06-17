import React from "react"
import SlideMenuContainer from "./slidemenucontainer"
import SlideMenuCanvas from "./slidemenucanvas"

const SlideMenu = ({ title, visible, onSlideMenuClick }) => (
  <>
    {/* <SlideMenuButton onClick={menuClickHandle} /> */}
    <SlideMenuCanvas onClick={onSlideMenuClick} visible={visible} />
    <SlideMenuContainer
      title={title}
      onClick={onSlideMenuClick}
      visible={visible}
    />
  </>
)

SlideMenu.defaultProps = {
  onSlideMenuClick: null,
}

export default SlideMenu
