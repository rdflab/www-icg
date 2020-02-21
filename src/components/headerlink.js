import { Link } from "gatsby"
import React from "react"

import headerLinkStyles from "./headerlink.module.scss"

const HeaderLink = ({ to, children }) => (
  <Link to={to} className={`navbar-item ${headerLinkStyles.headerlink}`}>
    {children}
  </Link>
)

export default HeaderLink
