import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  padding-bottom: 0.5rem;
`

const LinkBlock = ({ children }) => <StyledDiv>{children}</StyledDiv>

export default LinkBlock
