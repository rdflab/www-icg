import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledLink = styled(Link)`
  color: rgb(28, 76, 143) !important;
  background: transparent !important;
  margin: 0;
  padding: 0;
  margin-right: 2rem;
  outline: none;
  transition: border-bottom 0.4s ease;
  border-bottom: solid 1px white;
  text-decoration: none;

  &:hover {
    color: rgb(28, 76, 143) !important;
    border-bottom: solid 1px rgb(28, 76, 143) !important;
    text-decoration: none;
  }
`
const HeaderLink = props => (
  <StyledLink
    {...props}
    activeStyle={{ borderBottom: "solid 1px rgb(28, 76, 143)" }}
  />
)

export default HeaderLink
