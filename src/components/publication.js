/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import publicationStyles from "./publication.module.scss"
import { Link } from "gatsby"

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

const Publication = ({ publication, labMap, peopleMap, showLabLink, maxAuthors }) => {
  const authors = authorString(publication.authors, maxAuthors)
  const labId = publication.labs[0]

  console.log(labId, labMap)

  let name

  if (labMap.has(labId)) {
    const lab = labMap.get(labId)
    const pi = lab.leaders[0]
    const person = peopleMap.get(pi)
    name = person.firstName + " " + person.lastName + " Lab"
  } else {
    name = ""
  }

  return (
    <article className={publicationStyles.publication}>
      <div className={publicationStyles.publicationTitle}>
        {publication.title}
      </div>
      <div>{authors}</div>
      <div className={publicationStyles.publicationYear}>
        {publication.year}
      </div>

      {name !== "" && showLabLink && (
        <Link to={`/research-areas/labs/${labId}`}>{name}</Link>
      )}
    </article>
  )
}

Publication.defaultProps = {
  maxAuthors: 4,
}

export default Publication
