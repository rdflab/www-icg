import React from "react"
import BlueLink from "../links/bluelink"
import WhiteLink from "../links/whitelink"
//import WhiteLink from "../whitelink"

const PersonLink = ({ person, color }) => {
  switch (color) {
    case "white":
      return (
        <WhiteLink to={`/people/${person.frontmatter.id}`}>
          {person.frontmatter.name}
          {person.frontmatter.postNominalLetters !== "" &&
            ", " + person.frontmatter.postNominalLetters}
        </WhiteLink>
      )
    default:
      return (
        <BlueLink to={`/people/${person.frontmatter.id}`}>
          {person.frontmatter.name}
          {person.frontmatter.postNominalLetters !== "" &&
            ", " + person.frontmatter.postNominalLetters}
        </BlueLink>
      )
  }
}

PersonLink.defaultProps = {
  color: "blue",
}

export default PersonLink
