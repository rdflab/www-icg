import React from "react"
//import WhiteLink from "./links/whitelink"
import Column from "./column"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HideSmall from "./hidesmall"

const Divider = ({ color, opacity }) => (
  <div className={`px-3 ${color} ${opacity}`}>
    <FontAwesomeIcon icon={[`fas`, `chevron-right`]} className={`text-2xl`} />
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
          className={`text-2xl ${color} ${opacity} hover:opacity-90 trans-ani`}
        />
      </Link>
    )

    ret.push(<Divider color={color} opacity={opacity} />)

    for (let i = 0; i < crumbs.length; ++i) {
      const crumb = crumbs[i]

      ret.push(
        <Link key={ret.length} to={crumb[1]}>
          <div
            className={`${color} ${opacity} hover:opacity-90 font-semibold trans-ani`}
          >
            {crumb[0]}
          </div>
        </Link>
      )

      if (i < crumbs.length - 1) {
        ret.push(<Divider color={color} opacity={opacity} />)
      }
    }

    return (
      <HideSmall className={`w-full pt-4 pb-8 ${className}`}>
        <Column className="items-center">{ret}</Column>
      </HideSmall>
    )
  } else {
    return <></>
  }
}

Breadcrumb.defaultProps = {
  className: "",
  opacity: "opacity-60",
  color: "text-gray-500",
}

export default Breadcrumb
