import React from "react"
import styled from "styled-components"
import H2 from "./h2"

const StyledHeader = styled(H2)`
  font-weight: 400 !important;
  padding-bottom: 1rem !important;
`

const Title = ({ children }) => <StyledHeader>{children}</StyledHeader>

export default Title
