import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerStyles from "./header.module.scss"
import Container from "react-bootstrap/Container"

const Header = ({ siteTitle }) => (
  <header className={headerStyles.header}>
    <Container>
    <div style={{padding: `10px`, color: `rgba(255, 255, 255, 0.8)`}}>INSTITUTE FOR CANCER GENETICS</div>
    </Container>
    <div style={{backgroundColor: `rgba(0, 0, 0, 0)`}}>
    <Container>
      <Link to={'/research-areas/labs/'}>Reasearch Labs</Link>
      </Container>
    </div>
    
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
