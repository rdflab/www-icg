import React from "react"
import BlueLink from "../links/bluelink"
import WhiteLink from "../links/whitelink"
import useSiteMetadata from "../../hooks/sitemetadata"
//import WhiteLink from "../whitelink"

const PersonLink = ({ person, color }) => {
  const { paths } = useSiteMetadata()

  switch (color) {
    case "white":
      return (
        <WhiteLink to={`${paths.peoplePath}/${person.frontmatter.id}`}>
          {person.frontmatter.name}
          {person.frontmatter.postNominalLetters !== "" &&
            ", " + person.frontmatter.postNominalLetters}
        </WhiteLink>
      )
    default:
      return (
        <BlueLink to={`${paths.peoplePath}/${person.frontmatter.id}`}>
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
