/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const StyledPub = styled.article`
  margin-bottom: 2rem;
`

const StyledTitle = styled.div`
  font-size: 1.2rem;
`

const StyledAuthors = styled.div`
  font-weight: 300;
`

const StyledYear = styled.div`
  //font-size: smaller;
  font-weight: 300;
`

/**
 * Format author list into string.
 *
 * @param {*} authors
 * @param {*} maxAuthors
 */
const authorString = (authors, maxAuthors) => {
  let strs = []

  if (authors.length <= maxAuthors) {
    for (let author of authors) {
      strs.push(author.lastName + " " + author.initials)
    }
  } else {
    for (let i = 0; i < 3; ++i) {
      strs.push(authors[i].lastName + " " + authors[i].initials)
    }

    strs.push("...")

    const n = authors.length - 1
    strs.push(authors[n].lastName + " " + authors[n].initials)
  }

  let ret = strs.join(", ")
  ret = ret.replace(/, ([^,]+)$/, ", and $1")

  return ret
}

const Publication = ({
  publication,
  labMap,
  peopleMap,
  showLabLink,
  maxAuthors,
}) => {
  const authors = authorString(publication.authors, maxAuthors)
  const labId = publication.labs[0]
  let name
  let shortName

  if (labId in labMap) {
    const lab = labMap[labId]
    const pi = lab.leaders[0]
    const person = peopleMap[pi]
    name =
      person.frontmatter.firstName + " " + person.frontmatter.lastName + " Lab"
    shortName = person.frontmatter.lastName + " Lab"
  } else {
    name = ""
    shortName = ""
  }

  return (
    <StyledPub>
      <StyledTitle>{publication.title}</StyledTitle>
      <StyledAuthors>{authors}</StyledAuthors>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          {publication.journal !== "" && (
            <StyledYear className="level-item">
              {publication.journal}
            </StyledYear>
          )}
          <StyledYear className="ml-4">{publication.year}</StyledYear>
        </div>

        <div className="flex flex-row">
          {name !== "" && showLabLink && (
            <div className="level-item">
              <Link to={`/research-areas/labs/${labId}`}>{shortName}</Link>
            </div>
          )}
        </div>
      </div>
    </StyledPub>
  )
}

Publication.defaultProps = {
  maxAuthors: 4,
}

export default Publication
