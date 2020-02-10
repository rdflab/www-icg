import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerStyles from "./header.module.scss"

import 'bootstrap/dist/css/bootstrap.css';
import {Container, Navbar, Nav, NavItem} from "react-bootstrap"


import HeaderLinks from "./headerlinks"
import ICGImage from "./icgimage";


const Header = ({ siteTitle }) => (
  <header className={headerStyles.header}>
    <Container>
      <Navbar expand="lg" style={{paddingLeft: 0, paddingRight: 0}}>
        <Navbar.Brand>
          {/* <Link to="/"><Logo style={{width: `200px`, border: `solid 1px red`}}></Logo></Link> */}
          <Link to="/"><ICGImage style={{width: `250px`}}/></Link>
        </Navbar.Brand>

        <Nav className="ml-auto justify-content-end" >
          <HeaderLinks></HeaderLinks>
        </Nav>
      </Navbar>
      
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
