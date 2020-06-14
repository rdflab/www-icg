/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Column from "../column"

import LinkExt from "../links/linkext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

/**
 * Format author list into string.
 *
 * @param {*} authors
 * @param {*} maxAuthors
 */
const authorString = (authors, maxAuthors) => {
  let strs = []

  if (authors.length <= maxAuthors || maxAuthors === -1) {
    for (let author of authors) {
      strs.push(author) //.lastName + " " + author.initials)
    }
  } else {
    for (let i = 0; i < 3; ++i) {
      strs.push(authors[i]) //.lastName + " " + authors[i].initials)
    }

    strs.push("...")

    const n = authors.length - 1
    strs.push(authors[n]) //.lastName + " " + authors[n].initials)
  }

  let ret = strs.join(", ")
  ret = ret.replace(/, ([^,]+)$/, ", and $1")

  return ret
}

export const pubmedUrl = (pubmed) => {
  return `https://www.ncbi.nlm.nih.gov/pubmed/?term=${pubmed}`
}

const PubMedLink = ({ publication, children }) => (
  <LinkExt target="_blank" to={pubmedUrl(publication.pubmed)}>
    {children}
  </LinkExt>
)

const Publication = ({ publication, showLabLink, maxAuthors }) => {
  const authors = authorString(publication.authors, maxAuthors)
  // let groups = []

  // for (let group of publication.groups) {
  //   groups.push([group.frontmatter.id, group.frontmatter.name])
  // }

  return (
    <div className="mb-8">
      <h4>{publication.title}</h4>
      <div className="font-light">{authors}</div>

      <Column>
        <Column w="1/2">
          {publication.journal !== "" && <>{publication.journal}.</>}
          {publication.year !== -1 && <> {publication.year}.</>}
          {publication.tags.includes("In Press") && <> In Press.</>}
        </Column>

        <Column w="1/2">
          {/* {publication.groups.length > 0 && showLabLink && (
            <div className="md:text-right">
              <BlueLink
                to={`/research-areas/labs/${publication.groups[0].frontmatter.id}`}
              >
                {publication.groups[0].frontmatter.name}
              </BlueLink>
            </div>
          )} */}
        </Column>
      </Column>

      {publication.pubmed !== "" && (
        <Column className="blue items-center">
          <div>
            <PubMedLink publication={publication}>PubMed</PubMedLink>
          </div>
          <div className="ml-1">
            <PubMedLink publication={publication}>
              {
                <FontAwesomeIcon
                  icon="external-link-alt"
                  className={`text-lg`}
                />
              }
            </PubMedLink>
          </div>

          <div className="ml-4">
            <LinkExt
              target="_blank"
              to={`https://scholar.google.com/scholar?hl=en&as_sdt=0%2C33&q=${publication.title}`}
            >
              Google Scholar
            </LinkExt>
          </div>

          <div className="ml-1">
            <LinkExt
              target="_blank"
              to={`https://scholar.google.com/scholar?hl=en&as_sdt=0%2C33&q=${publication.title}`}
            >
              <FontAwesomeIcon icon="external-link-alt" className={`text-lg`} />
            </LinkExt>
          </div>
        </Column>
      )}
    </div>
  )
}

Publication.defaultProps = {
  showLabLink: false,
  maxAuthors: -1,
}

export default Publication
