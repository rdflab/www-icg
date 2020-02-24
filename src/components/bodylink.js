import { Link } from "gatsby"
import styled from "styled-components"

const BodyLink = styled(Link)`
  color: cornflowerblue !important;
  background: transparent !important;
  margin: 0;
  padding: 0;
  outline: none;
  transition: border-bottom 0.5s ease;
  border-bottom: solid 1px white;
  text-decoration: none;

  &:hover {
    color: cornflowerblue !important;
    border-bottom: solid 1px cornflowerblue;
    text-decoration: none;
  }
`

export default BodyLink
