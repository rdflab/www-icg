import { Link } from "gatsby"
import styled from "styled-components"

const SideBarLink = styled(Link)`
  color: rgba(0, 0, 0, 0.5) !important;

  &:hover {
    color: rgba(0, 0, 0, 0.5) !important;
    border-bottom: solid 1px rgba(0, 0, 0, 0.5);
    text-decoration: none;
  }
`

export default SideBarLink
