import { Link } from "gatsby"
import styled from "styled-components"

const SideBarLink = styled(Link)`
  color: rgba(0, 0, 0, 0.5);
  margin: 0;
  padding: 0;
  outline: none;
  transition: border-bottom 0.5s ease;
  border-bottom: solid 1px rgba(0, 0, 0, 0);
  text-decoration: none;
  //font-weight: 300;

  &:hover {
    color: rgba(0, 0, 0, 0.5) !important;
    border-bottom: solid 1px rgba(0, 0, 0, 0.5);
    text-decoration: none;
  }
`

export default SideBarLink
