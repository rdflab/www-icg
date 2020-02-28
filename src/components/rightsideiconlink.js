import React from "react"
import { IconContext } from "react-icons"
import styled from "styled-components"

const StyledSpan = styled.span`
  color: rgb(100, 100, 100);
  padding-right: 1rem;
`

const RightSideIconLink = ({ children }) => <StyledSpan>{children}</StyledSpan>

export default RightSideIconLink
