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

  &:hover {
    outline: none;
  }
`
const Icon = styled(FaBars)`
  color: rgb(28, 76, 143);
`

const SlideMenuButton = ({ onClickHandle }) => (
  <StyledButton onClick={onClickHandle}>
    <Icon />
  </StyledButton>
)

export default SlideMenuButton
