import React from "react"
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"

const StyledButton = styled.button`
  padding: 1rem;
  margin: 0;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  float: left;

  &:hover {
    outline: none;
  }
`

const Icon = styled(FaTimes)`
  color: white;
`

const SlideMenuCloseButton = ({ onClickHandle }) => (
  <StyledButton onClick={onClickHandle}>
    <Icon size={28} />
  </StyledButton>
)

export default SlideMenuCloseButton
