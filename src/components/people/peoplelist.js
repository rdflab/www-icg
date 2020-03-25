/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Person from "./person"

const PeopleList = ({ people, groupMap, showLabLink, imageMap }) => (
  <>
    {people.map((person, index) => (
      <Person
        key={index}
        person={person}
        groupMap={groupMap}
        showLabLink={showLabLink}
        image={
          person.frontmatter.id in imageMap
            ? imageMap[person.frontmatter.id]
            : null
        }
      />
    ))}
  </>
)

PeopleList.defaultProps = {
  showLabLink: true,
  imageMap: {},
}

export default PeopleList
