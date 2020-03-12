/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import BlueLink from "../bluelink"
import Columns from "../columns"
import Column from "../column"
import { FaExternalLinkAlt } from "react-icons/fa"
import BlueLinkExt from "../bluelinkext"
import PubMedLink from "./pubmedlink"

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

const Publication = ({ publication, showLabLink, maxAuthors }) => {
  const authors = authorString(publication.authors, maxAuthors)
  let groups = []

  for (let group of publication.groups) {
    groups.push([group.frontmatter.id, group.frontmatter.name])
  }

  return (
    <div className="mb-8">
      <h3>{publication.title}</h3>
      <div className="font-light">{authors}</div>

      <Columns>
        <Column w="1/2">
          {publication.journal !== "" && <>{publication.journal}.</>}
          {publication.year !== -1 && <> {publication.year}.</>}
          {publication.tags.includes("In Press") && <> In Press.</>}
        </Column>

        <Column w="1/2">
          {publication.groups.length > 0 && showLabLink && (
            <div className="md:text-right">
              <BlueLink
                to={`/research-areas/labs/${publication.groups[0].frontmatter.id}`}
              >
                {publication.groups[0].frontmatter.name}
              </BlueLink>
            </div>
          )}
        </Column>
      </Columns>

      {publication.pubmed !== "" && (
        <div className="row blue items-center">
          <div>
            <PubMedLink publication={publication} />
          </div>
          <div className="ml-1">
            <FaExternalLinkAlt />
          </div>

          <div className="ml-4">
            <BlueLinkExt
              target="_blank"
              to={`https://scholar.google.com/scholar?hl=en&as_sdt=0%2C33&q=${publication.title}`}
            >
              Google Scholar
            </BlueLinkExt>
          </div>

          <div className="ml-1">
            <FaExternalLinkAlt />
          </div>
        </div>
      )}
    </div>
  )
}

Publication.defaultProps = {
  showLabLink: false,
  maxAuthors: 4,
}

export default Publication
