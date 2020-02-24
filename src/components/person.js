/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import personStyles from "./person.module.scss"
import { Link } from "gatsby"
import Columns from "./columns"
import Column from "./column"
import EmailLink from "./emaillink"
import BodyLink from "./bodylink"

const Person = ({ person, labMap, showLabLink }) => {
  return (
    <div className={personStyles.person}>
      <Columns>
        <Column>
          <div>
            <BodyLink to={`/research-areas/faculty-and-staff/${person.id}`}>
              {person.firstName} {person.lastName}
            </BodyLink>
          </div>
          <div>{person.titles[0]}</div>
        </Column>
        <Column w={5}>
          {person.email !== "" && <EmailLink to={person.email} />}
        </Column>
      </Columns>
    </div>
  )
}

export default Person
