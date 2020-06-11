import React from "react"
import BlueLink from "../links/bluelink"
import WhiteLink from "../links/whitelink"
import useSiteMetadata from "../../hooks/sitemetadata"
//import WhiteLink from "../whitelink"

const PersonLink = ({ person, color }) => {
  const { paths } = useSiteMetadata()

  const name = `${person.frontmatter.name}${
    person.frontmatter.postNominalLetters !== ""
      ? `, ${person.frontmatter.postNominalLetters}`
      : ""
  }`

  switch (color) {
    case "white":
      return (
        <WhiteLink to={`${paths.peoplePath}/${person.frontmatter.id}`}>
          {name}
        </WhiteLink>
      )
    default:
      return (
        <BlueLink to={`${paths.peoplePath}/${person.frontmatter.id}`}>
          {name}
        </BlueLink>
      )
  }
}

PersonLink.defaultProps = {
  color: "blue",
}

export default PersonLink
