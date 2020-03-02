import React from "react"
import { Link } from "gatsby"

const HeaderLink = props => (
  <Link
    className="header-link"
    {...props}
    activeStyle={{ borderBottom: "solid 1px rgb(28, 76, 143)" }}
  />
)

export default HeaderLink
