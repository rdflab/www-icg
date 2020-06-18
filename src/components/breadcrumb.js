import React from "react"
import Container from "./container"
import WhiteLink from "./links/whitelink"
import Column from "./column"
import breadcrumbarrowsvg from "../assets/svg/breadcrumbarrow.svg"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Breadcrumb = ({ crumbs, className }) => {
  if (crumbs.length > 0) {
    const ret = []

    ret.push(
      <Link to="/" key={ret.length}>
        <FontAwesomeIcon icon="home" className="text-2xl" />
      </Link>
    )

    ret.push(
      <img
        src={breadcrumbarrowsvg}
        className="px-4 h-6 opacity-90"
        key={ret.length}
        alt="Breadcrumb separator"
      />
    )

    for (let i = 0; i < crumbs.length; ++i) {
      const crumb = crumbs[i]

      ret.push(
        <WhiteLink key={ret.length} to={crumb[1]}>
          {crumb[0]}
        </WhiteLink>
      )

      if (i < crumbs.length - 1) {
        ret.push(
          // <FaChevronRight
          //   key={`arrow-${i}`}
          //   className="text-white-opacity-50 mx-2"
          // />

          <img
            src={breadcrumbarrowsvg}
            className="px-4 h-6 opacity-90"
            key={ret.length}
            alt="Breadcrumb separator"
          />
        )
      }
    }

    return (
      <div
        className={`w-full bg-columbia-secondary-blue-90 text-white-90 text-sm py-3 ${className}`}
      >
        <Container>
          <Column className="items-center">{ret}</Column>
        </Container>
      </div>
    )
  } else {
    return <></>
  }
}

Breadcrumb.defaultProps = {
  className: "",
}

export default Breadcrumb
