import styled from "styled-components"
import { Link } from "gatsby"

const Button = styled(Link)`
  background: rgba(29, 79, 145, 0.7);
  border-radius: 5px;
  padding: 0.6rem;
  padding-left: 1.8rem;
  padding-right: 1.8rem;
  transition: 0.4s;
  color: white !important;
  display: inline-block;
  text-align: center;

  &:hover {
    color: white !important;
    background: rgba(29, 79, 145, 0.9);
  }
`

export default Button
