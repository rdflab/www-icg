import React from "react"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"
import { IconContext } from "react-icons"

const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  float: left;
  margin-left: 1rem;
`
const SlideMenuCloseButton = ({ onClickHandle }) => (
  <StyledButton onClick={onClickHandle}>
    <IconContext.Provider value={{ color: "white" }}>
      <FaTimes />
    </IconContext.Provider>
  </StyledButton>
)

export default SlideMenuCloseButton
