import { Link } from "gatsby"
import styled from "styled-components"

const BreadcrumbLink = styled(Link)`
  color: white;
  background: transparent;
  margin: 0;
  padding: 0;
  margin-right: 2rem;
  outline: none;
  transition: border-bottom 0.4s;
  border-bottom: solid 1px white;
  text-decoration: none;

  &:hover {
    border-bottom: solid 1px white;
    text-decoration: none;
  }
`

export default BreadcrumbLink
