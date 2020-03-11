import React from "react"
import { Link } from "gatsby"
import breadcrumbStyles from "./breadcrumbv2.module.scss"
import Container from "../container"
import BlueLink from "../bluelink"
//import BreadcrumbLink from "./breadcrumblink"

const Breadcrumb = props => {
  return (
    <Container>
      <ul className="list-none overflow-hidden my-4">
        {props.crumbs.map((crumb, index) => (
          <li className={breadcrumbStyles.breadcrumbLi} key={index}>
            <BlueLink to={crumb[1]}>{crumb[0]}</BlueLink>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default Breadcrumb
