import { Link } from "gatsby"
import styled from "styled-components"

const HeaderLink = styled(Link)`
  color: rgba(28, 76, 143, 1);
  background: transparent !important;
  margin: 0;
  padding: 0;
  margin-right: 2rem;
  outline: none;
  transition: border-bottom 0.5s ease;
  border-bottom: solid 1px white;
  text-decoration: none;

  &:hover {
    color: rgba(28, 76, 143, 0.8) !important;
    border-bottom: solid 1px rgba(28, 76, 143, 1);
    text-decoration: none;
  }
`

export default HeaderLink
