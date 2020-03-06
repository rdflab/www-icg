import React, { useState } from "react"
import SlideMenuButton from "./slidemenubutton"
import SlideMenuContainer from "./slidemenucontainer"
import SlideMenuCanvas from "./slidemenucanvas"

const SlideMenu = ({ title }) => {
  const [visible, setVisible] = useState(false)

  const toggleMenu = () => {
    setVisible(!visible)
  }

  const onClickHandle = e => {
    toggleMenu()
  }

  return (
    <>
      <SlideMenuButton onClickHandle={onClickHandle} />
      <SlideMenuCanvas onClickHandle={onClickHandle} visible={visible} />
      <SlideMenuContainer
        title={title}
        onClickHandle={onClickHandle}
        visible={visible}
      />
    </>
  )
}

export default SlideMenu
