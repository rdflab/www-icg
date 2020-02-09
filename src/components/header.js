import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerStyles from "./header.module.scss"

const Header = ({ siteTitle }) => (
  <header className={headerStyles.header}>
    <div style={{padding: `20px`}}>INSTITUTE FOR <strong>CANCER GENETICS</strong></div>

    <div style={{backgroundColor: `rgba(0, 0, 0, 0.2)`, padding:`10px`}}>
      <Link to={'/research-areas/labs/'}>Reasearch Labs</Link>
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
