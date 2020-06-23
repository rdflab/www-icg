import React from "react"
import Container from "./container"
//import WhiteLink from "./links/whitelink"
import Column from "./column"
import breadcrumbarrowsvg from "../assets/svg/breadcrumbarrow.svg"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HideSmall from "./hidesmall"

const Divider = ({ color, opacity }) => (
  <div className={`px-3 text-white opacity-${opacity}`}>
    <FontAwesomeIcon icon={[`fas`, `chevron-right`]} className={`text-lg`} />
  </div>
)

const Breadcrumb = ({ crumbs, opacity, content, className }) => {
  if (crumbs !== null && crumbs.length > 0) {
    const ret = []

    ret.push(
      <Link to="/" key={ret.length}>
        <FontAwesomeIcon
          icon="home"
          className={`text-xl text-white opacity-${opacity} hover:opacity-100 trans-ani`}
        />
      </Link>
    )

    ret.push(
      // <img
      //   src={breadcrumbarrowsvg}
      //   className={`px-4 h-6 opacity-${opacity}`}
      //   key={ret.length}
      //   alt="Breadcrumb separator"
      // />
      <Divider opacity={opacity} />
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
          // <img
          //   src={breadcrumbarrowsvg}
          //   className="px-4 h-6 opacity-${opacity}"
          //   key={ret.length}
          //   alt="Breadcrumb separator"
          // />

          <Divider opacity={opacity} />
        )
      }
    }

    return (
      <HideSmall className={`bg-columbia-blue-90 py-2 ${className}`}>
        <Container>
          <Column className="justify-between items-center">
            <Column className="items-center">{ret}</Column>

            <div>{content !== null && content}</div>
          </Column>
        </Container>
      </HideSmall>
    )
  } else {
    return <></>
  }
}

Breadcrumb.defaultProps = {
  className: "",
  content: null,
  opacity: 80,
}

export default Breadcrumb
