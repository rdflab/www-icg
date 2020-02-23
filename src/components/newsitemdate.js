import React, { Children } from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  font-weight: 300;
  text-transform: uppercase;
  color: rgb(100, 100, 100);
`

const NewsItemDate = ({ children }) => <StyledDiv>{children}</StyledDiv>

export default NewsItemDate
