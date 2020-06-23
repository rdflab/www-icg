import React from "react"
//import WhiteLink from "./links/whitelink"
import Column from "./column"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HideSmall from "./hidesmall"
import Container from "./container"

const Divider = ({ color, opacity }) => (
  <div className={`px-3 ${color} ${opacity}`}>
    <FontAwesomeIcon icon={[`fas`, `chevron-right`]} className={`text-xl`} />
  </div>
  //<div className={`px-3 ${color} opacity-70`}><h5>/</h5></div>
)

const Breadcrumb = ({ crumbs, color, opacity, className }) => {
  if (crumbs.length > 0) {
    const ret = []

    ret.push(
      <Link to="/" key={ret.length}>
        <FontAwesomeIcon
          icon="home"
          className={`text-xl ${color} ${opacity} hover:opacity-90 trans-ani`}
        />
      </Link>
    )

    ret.push(<Divider color={color} opacity={opacity} />)

    for (let i = 0; i < crumbs.length; ++i) {
      const crumb = crumbs[i]

      ret.push(
        <Link key={ret.length} to={crumb[1]}>
          <div className={`${color} ${opacity} hover:opacity-90 trans-ani`}>
            {crumb[0]}
          </div>
        </Link>
      )

      if (i < crumbs.length - 1) {
        ret.push(<Divider color={color} opacity={opacity} />)
      }
    }

    return (
      <HideSmall className={`w-full py-3 bg-white-90 ${className}`}>
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
  opacity: "opacity-80",
  color: "text-columbia-blue",
}

export default Breadcrumb
