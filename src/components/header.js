import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerStyles from "./header.module.scss"
import Container from "react-bootstrap/Container"

import Logo from "../assets/logo.svg";
import HeaderLinks from "./headerlinks"


const Header = ({ siteTitle }) => (
  <header className={headerStyles.header}>
    <Container>
      <Logo style={{width: `400px`}}></Logo>
    </Container>
    <Container>
      <HeaderLinks></HeaderLinks>
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
