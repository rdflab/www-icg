import React from "react"
import { Link } from "gatsby"
import breadcrumbStyles from "./breadcrumb.module.scss"

const Breadcrumb = props => {
    return (
      <div>
          <ul className={breadcrumbStyles.breadcrumb}>
              {props.crumbs.map((crumb, index) => (
                  <li key={index}><Link to={crumb[1]}>{crumb[0]}</Link></li>
              ))}
          </ul>
          <div style={{ clear: 'both' }}></div>
      </div>  
    )
}

export default Breadcrumb