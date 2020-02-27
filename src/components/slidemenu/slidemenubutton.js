import React from "react"
import styled from "styled-components"
import { FaBars } from "react-icons/fa"

const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  color: white;

  &:hover {
    outline: none;
  }
`

const SlideMenuButton = ({ onClickHandle }) => (
  <StyledButton onClick={onClickHandle}>
    <FaBars />
  </StyledButton>
)

export default SlideMenuButton
