import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import headerLinkStyles from "./headerlink.module.scss"

const HeaderLink = ({ index, children }) => (
  <Link className={headerLinkStyles.headerlink}>
    {children}
  </Link>
)

export default HeaderLink
