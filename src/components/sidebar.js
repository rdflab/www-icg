import React from "react"
import styled from "styled-components"

const StyledDiv = styled.div`
  padding: 1rem;
  background-color: rgb(245, 245, 245);
`

const SideBar = ({ children }) => <StyledDiv>{children}</StyledDiv>

export default SideBar
