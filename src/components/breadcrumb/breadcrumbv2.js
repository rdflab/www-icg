import React from "react"
import Container from "../container"
import { FaHome } from "react-icons/fa"
import WhiteLink from "../whitelink"
import Column from "../column"
import breadcrumbsvg from "../../assets/svg/breadcrumb.svg"
import { Link } from "gatsby"

const Breadcrumb = ({ crumbs }) => {
  const ret = []

  ret.push(
    <Link to="/" key={ret.length}>
      <FaHome className="text-white" size={24} />
    </Link>
  )

  ret.push(
    <img
      src={breadcrumbsvg}
      className="text-white px-4 h-10"
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
          className="text-white px-4 h-10"
          key={ret.length}
          alt="Breadcrumb separator"
        />
      )
    }
  }

  return (
    <div className="bg-blue-columbia-80 text-sm">
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

export default Breadcrumb
