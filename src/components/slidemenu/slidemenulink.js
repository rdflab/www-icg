import React from "react"
import { Link } from "gatsby"

const SlideMenuLink = ({ to, children, active }) => (
  <Link
    className={`slide-menu-link ${active ? "slide-menu-link-active" : ""}`}
    to={to}
  >
    <div className="row items-center justify-between">
      <div>{children}</div>
      {/* {!active && (
        <div>
          <FaChevronRight />
        </div>
      )} */}
    </div>
  </Link>
)

export default SlideMenuLink
