import React from "react"
import Container from "../container"
import BlueLink from "../bluelink"
import GrayLink from "../graylink"
import { FaChevronRight } from "react-icons/fa"

const Breadcrumb = ({ crumbs }) => {
  const ret = []

  for (let i = 0; i < crumbs.length; ++i) {
    const crumb = crumbs[i]
    ret.push(
      <BlueLink key={`link-${i}`} to={crumb[1]}>
        {crumb[0]}
      </BlueLink>
    )

    if (i < crumbs.length - 1) {
      ret.push(
        <FaChevronRight
          key={`arrow-${i}`}
          className="text-blue-columbia-50 mx-2"
        />
      )
    }
  }

  return (
    <div className="bg-gray-200 p-0">
      <Container>
        <div className="row items-center py-2">{ret}</div>
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
