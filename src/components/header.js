import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerStyles from "./header.module.scss"

import HeaderLinks from "./headerlinks"
import ICGImage from "./icgimage"

const Header = ({ siteTitle }) => (
  <header className={headerStyles.header}>
    <div className="container">
      <nav
        className="navbar is-marginless is-paddingless"
        role="navigation"
        aria-label="main navigation"
      >
        <div
          className="navbar-brand is-marginless is-paddingless"
          style={{ width: "100%" }}
        >
          <Link to="/">
            <ICGImage style={{ width: `250px` }} />
          </Link>
        </div>
        <div className="navbar-start is-marginless is-paddingless">
          <HeaderLinks />
        </div>
      </nav>
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
