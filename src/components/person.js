/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import personStyles from "./person.module.scss"
import { Link } from "gatsby"

const Person = ({ person, labMap, showLabLink }) => {
  return (
    <div className={personStyles.person}>
      <div>
        <Link to={`/research-areas/faculty-and-staff/${person.id}`}>
          {person.firstName} {person.lastName}
        </Link>
      </div>
      <div>{person.titles[0]}</div>
    </div>
  )
}

export default Person
