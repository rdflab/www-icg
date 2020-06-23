import React from "react"
import Container from "./container"
//import WhiteLink from "./links/whitelink"
import Column from "./column"
import breadcrumbarrowsvg from "../assets/svg/breadcrumbarrow.svg"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HideSmall from "./hidesmall"

const Breadcrumb = ({ crumbs, opacity, className }) => {
  if (crumbs !== null && crumbs.length > 0) {
    const ret = []

    ret.push(
      <Link to="/" key={ret.length}>
        <FontAwesomeIcon
          icon="home"
          className={`text-2xl text-white opacity-${opacity} hover:opacity-100 trans-ani`}
        />
      </Link>
    )

    ret.push(
      <img
        src={breadcrumbarrowsvg}
        className={`px-4 h-6 opacity-${opacity}`}
        key={ret.length}
        alt="Breadcrumb separator"
      />
    )

    for (let i = 0; i < crumbs.length; ++i) {
      const crumb = crumbs[i]

      ret.push(
        <Link key={ret.length} to={crumb[1]}>
          <div
            className={`text-white opacity-${opacity} hover:opacity-100 trans-ani`}
          >
            {crumb[0]}
          </div>
        </Link>
      )

      if (i < crumbs.length - 1) {
        ret.push(
          // <FaChevronRight
          //   key={`arrow-${i}`}
          //   className="text-white-opacity-50 mx-2"
          // />

          <img
            src={breadcrumbarrowsvg}
            className="px-4 h-6 opacity-${opacity}"
            key={ret.length}
            alt="Breadcrumb separator"
          />
        )
      }
    }

    return (
      <HideSmall
        className={`w-full bg-columbia-secondary-blue-90 text-sm py-3 ${className}`}
      >
        <Container>
          <Column className="items-center">{ret}</Column>
        </Container>
      </HideSmall>
    )
  } else {
    return <></>
  }
}

Breadcrumb.defaultProps = {
  className: "",
  opacity: 80,
}

export default Breadcrumb
