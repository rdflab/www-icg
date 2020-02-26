import React, { useState } from "react"
import SlideMenuButton from "./slidemenubutton"
import SlideMenuContainer from "./slidemenucontainer"
import styled from "styled-components"

const SlideMenu = () => {
  const [visible, setVisible] = useState(false)

  const toggleMenu = () => {
    setVisible(!visible)
  }

  const onClickHandle = e => {
    toggleMenu()

    console.log("clicked")
    //e.stopPropagation();
  }

  return (
    <>
      <SlideMenuButton onClickHandle={onClickHandle} />
      <SlideMenuContainer onClickHandle={onClickHandle} visible={visible} />
    </>
  )
}

export default SlideMenu
