/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import BodyLink from "../bodylink"
import styled from "styled-components"

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
    name = person.firstName + " " + person.lastName + " Lab"
    shortName = person.lastName + " Lab"
  } else {
    name = ""
    shortName = ""
  }

  return (
    <StyledPub>
      <StyledTitle>{publication.title}</StyledTitle>
      <StyledAuthors>{authors}</StyledAuthors>

      <div class="level is-mobile">
        <div class="level-left">
          {publication.journal !== "" && (
            <StyledYear className="level-item">
              {publication.journal}
            </StyledYear>
          )}
          <StyledYear className="level-item">{publication.year}</StyledYear>
        </div>

        <div class="level-right">
          {name !== "" && showLabLink && (
            <div className="level-item">
              <BodyLink to={`/research-areas/labs/${labId}`}>
                {shortName}
              </BodyLink>
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
