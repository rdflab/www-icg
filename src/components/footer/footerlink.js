import { Link } from "gatsby"
import styled from "styled-components"

const FooterLink = styled(Link)`
  color: white !important;
  background: transparent !important;
  margin: 0;
  padding: 0;
  outline: none;
  transition: border-bottom 0.4s;
  border-bottom: solid 1px rgba(255, 255, 255, 0);
  text-decoration: none;

  &:hover {
    color: white !important;
    border-bottom: solid 1px white;
    text-decoration: none;
  }
`

export default FooterLink
