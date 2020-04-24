import React from "react"
import Container from "../container"
import BlueLink from "../bluelink"
import { FaChevronRight } from "react-icons/fa"
import WhiteLink from "../whitelink"

const Breadcrumb = ({ crumbs }) => {
  const ret = []

  for (let i = 0; i < crumbs.length; ++i) {
    const crumb = crumbs[i]

    ret.push(
      <WhiteLink key={`link-${i}`} to={crumb[1]}>
        {crumb[0]}
      </WhiteLink>
    )

    if (i < crumbs.length - 1) {
      ret.push(
        <FaChevronRight key={`arrow-${i}`} className="text-white mx-2" />
      )
    }
  }

  return (
    <div className="pb-4 pt-2 bg-blue-columbia-80 text-sm">
      <Container>
        <div className="row items-center">{ret}</div>
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
