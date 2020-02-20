/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Person from "./person"

const PeopleList = ({ people, labMap, showLabLink }) => (
  <>
    {people.map((person, index) => (
      <Person
        key={index}
        person={person}
        labMap={labMap}
        showLabLink={showLabLink}
      />
    ))}
  </>
)

export default PeopleList
