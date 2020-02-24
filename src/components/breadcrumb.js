import React from "react"
import { Link } from "gatsby"
import breadcrumbStyles from "./breadcrumb.module.scss"
//import BreadcrumbLink from "./breadcrumblink"

const Breadcrumb = props => {
  return (
    <div className={`${breadcrumbStyles.breadcrumbContainer} is-hidden-mobile`}>
      <div className="container">
        <ul className={breadcrumbStyles.breadcrumb}>
          {props.crumbs.map((crumb, index) => (
            <li key={index}>
              <Link to={crumb[1]}>{crumb[0]}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Breadcrumb
