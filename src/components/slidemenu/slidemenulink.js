import React from "react"
import { Link } from "gatsby"
import { FaChevronRight } from "react-icons/fa"

const SlideMenuLink = ({ to, children }) => (
  <Link className="slide-menu-link" to={to}>
    <div className="row items-center justify-between">
      <div>{children}</div>
      <div>
        <FaChevronRight />
      </div>
    </div>
  </Link>
)

export default SlideMenuLink
