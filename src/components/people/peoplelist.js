/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Person from "./person"

const PeopleList = ({ people, groupMap: groupMap, showLabLink }) => (
  <>
    {people.map((person, index) => (
      <Person
        key={index}
        person={person}
        groupMap={groupMap}
        showLabLink={showLabLink}
      />
    ))}
  </>
)

export default PeopleList
