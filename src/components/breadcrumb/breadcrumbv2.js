import React from "react"
import Container from "../container"
import WhiteLink from "../links/whitelink"
import Column from "../column"
import breadcrumbsvg from "../../assets/svg/breadcrumb.svg"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Breadcrumb = ({ crumbs, className }) => {
  const ret = []

  ret.push(
    <Link to="/" key={ret.length}>
      <FontAwesomeIcon icon="home" className="text-white text-2xl" />
    </Link>
  )

  ret.push(
    <img
      src={breadcrumbsvg}
      className="text-white px-4 h-6"
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
          src={breadcrumbsvg}
          className="text-white px-4 h-6"
          key={ret.length}
          alt="Breadcrumb separator"
        />
      )
    }
  }

  return (
    <div
      className={`w-full bg-columbia-secondary-blue-90 text-sm py-2 ${className}`}
    >
      <Container>
        <Column className="items-center">{ret}</Column>
      </Container>
    </div>
  )

  // return (
  //   <div className="bg-gray-200 p-0">
  //   <Container>
  //     <ul className="list-none overflow-hidden py-2">
  //       {props.crumbs.map((crumb, index) => (
  //         <li className="breadcrumb-li" key={index}>
  //           <BlueLink to={crumb[1]}>{crumb[0]}</BlueLink>
  //         </li>
  //       ))}
  //     </ul>
  //   </Container>
  //   </div>
  // )
}

Breadcrumb.defaultProps = {
  className: "",
}

export default Breadcrumb
