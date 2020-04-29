import React from "react"
import BlueLink from "../bluelink"

const PersonLink = ({ person }) => (
  <BlueLink to={`/people/${person.frontmatter.id}`}>
    {person.frontmatter.name}
  </BlueLink>
)

export default PersonLink
