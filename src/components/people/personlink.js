import React from "react"
import BlueLink from "../bluelink"

const PersonLink = ({ person }) => (
  <BlueLink to={`/people/${person.frontmatter.id}`} className="font-semibold">
    {person.frontmatter.name}
    {person.frontmatter.postNominalLetters !== "" &&
      ", " + person.frontmatter.postNominalLetters}
  </BlueLink>
)

export default PersonLink
