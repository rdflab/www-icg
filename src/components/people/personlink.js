import React from "react"
import BlueLink from "../bluelink"
//import WhiteLink from "../whitelink"

const PersonLink = ({ person }) => (
  <BlueLink to={`/people/${person.frontmatter.id}`}>
    {person.frontmatter.name}
    {person.frontmatter.postNominalLetters !== "" &&
      ", " + person.frontmatter.postNominalLetters}
  </BlueLink>
)

export default PersonLink
