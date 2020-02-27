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
  color: rgba(255, 255, 255, 0.8);
  transition: 0.4s;

  &:hover {
    color: rgba(255, 255, 255, 1);
    outline: none;
  }
`

const Icon = styled(FaTimes)`
  color: white;
`

const SlideMenuCloseButton = ({ onClickHandle }) => (
  <StyledButton onClick={onClickHandle}>
    <FaTimes size={28} />
  </StyledButton>
)

export default SlideMenuCloseButton
