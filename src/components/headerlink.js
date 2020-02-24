import { Link } from "gatsby"
import styled from "styled-components"

const HeaderLink = styled(Link)`
  color: rgb(28, 76, 143) !important;
  background: transparent !important;
  margin: 0;
  padding: 0;
  margin-right: 2rem;
  outline: none;
  transition: border-bottom 0.5s ease;
  border-bottom: solid 1px white;
  text-decoration: none;

  &:hover {
    color: rgb(28, 76, 143) !important;
    border-bottom: solid 1px rgb(28, 76, 143) !important;
    text-decoration: none;
  }
`

export default HeaderLink
