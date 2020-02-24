import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
`

const Card = ({ children }) => <StyledDiv>{children}</StyledDiv>

export default Card
