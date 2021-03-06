/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Person from "./person"

const PeopleList = ({ people, showLabLink, imageMap }) => (
  <>
    {people.map((person, index) => (
      <Person
        key={index}
        person={person}
        showLabLink={showLabLink}
        image={
          person.frontmatter.id in imageMap
            ? imageMap[person.frontmatter.id]
            : null
        }
        generic={imageMap["generic"]}
      />
    ))}
  </>
)

PeopleList.defaultProps = {
  showLabLink: true,
  imageMap: {},
}

export default PeopleList
