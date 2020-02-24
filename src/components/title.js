import React from "react"
import styled from "styled-components"

const StyledHeader = styled.h2`
  font-weight: 400 !important;
  padding-bottom: 1rem !important;
`

const Title = ({ children }) => <StyledHeader>{children}</StyledHeader>

export default Title
