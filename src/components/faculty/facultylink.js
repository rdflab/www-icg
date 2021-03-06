import React from "react"
import BlueLink from "../links/bluelink"
import WhiteLink from "../links/whitelink"
import useSiteMetadata from "../../hooks/sitemetadata"
//import WhiteLink from "../whitelink"

const FacultyLink = ({ person, color }) => {
  const { paths } = useSiteMetadata()

  const name = `${person.frontmatter.name}${
    person.frontmatter.postNominalLetters !== ""
      ? `, ${person.frontmatter.postNominalLetters}`
      : ""
  }`

  switch (color) {
    case "white":
      return (
        <WhiteLink to={`${paths.facultyPath}/${person.frontmatter.id}`}>
          {name}
        </WhiteLink>
      )
    default:
      return (
        <BlueLink to={`${paths.facultyPath}/${person.frontmatter.id}`}>
          {name}
        </BlueLink>
      )
  }
}

FacultyLink.defaultProps = {
  color: "blue",
}

export default FacultyLink
