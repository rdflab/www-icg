import { Link } from "gatsby"
import styled from "styled-components"

const SlideMenuLink = styled(Link)`
  color: rgba(28, 76, 143, 0.8) !important;
  background-color: white;
  margin: 0;
  outline: none;
  padding: 1rem;
  border-bottom: solid 1px lightgray !important; //rgba(28, 76, 143, 0.4);
  font-weight: 600;
  text-decoration: none;
  display: block;
  width: 100%;
  transition: background-color 0.4s;

  &:hover {
    color: rgba(28, 76, 143, 0.8) !important;
    background-color: rgba(28, 76, 143, 0.2);
    text-decoration: none;
  }
`

export default SlideMenuLink
