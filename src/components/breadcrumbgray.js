import React from "react"
import Container from "./container"
//import WhiteLink from "./links/whitelink"
import Column from "./column"
import breadcrumbarrowsvg from "../assets/svg/breadcrumb-arrow.svg"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HideSmall from "./hidesmall"

const Divider = ({ color, opacity }) => (
  <div className={`px-3 opacity-${opacity}`}>
    {/* <FontAwesomeIcon icon={[`fas`, `chevron-right`]} className={`text-lg`} /> */}
    <img
      src={breadcrumbarrowsvg}
      className={`h-6 opacity-${opacity}`}
      alt="Breadcrumb separator"
    />
  </div>
)

const BreadcrumbGray = ({ crumbs, color, opacity, content, className }) => {
  if (crumbs !== null && crumbs.length > 0) {
    const ret = []

    ret.push(
      <Link to="/" key={ret.length}>
        <FontAwesomeIcon
          icon="home"
          className={`text-xl ${color} opacity-${opacity} hover:opacity-100 trans-ani`}
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
      <Divider opacity={opacity} key={`divider-${ret.length}`} />
    )

    for (let i = 0; i < crumbs.length; ++i) {
      const crumb = crumbs[i]

      ret.push(
        <Link key={ret.length} to={crumb[1]}>
          <div
            className={`${color} opacity-${opacity} hover:opacity-100 trans-ani`}
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

          <Divider opacity={opacity} key={`divider-${ret.length}`} />
        )
      }
    }

    return (
      <HideSmall className={`w-full  pt-8 ${className}`}>
        <Container className="border-t border-solid border-gray-400 py-5">
          <Column className="justify-between items-center">
            <Column>{ret}</Column>

            <div>{content !== null && content}</div>
          </Column>
        </Container>
      </HideSmall>
    )
  } else {
    return <></>
  }
}

BreadcrumbGray.defaultProps = {
  className: "",
  content: null,
  color: "text-gray-500",
  opacity: 80,
}

export default BreadcrumbGray
