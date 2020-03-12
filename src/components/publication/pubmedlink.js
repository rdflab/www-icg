/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import BlueLinkExt from "../bluelinkext"

export const pubmedUrl = pubmed => {
  return `https://www.ncbi.nlm.nih.gov/pubmed/?term=${pubmed}`
}

const PubMedLink = ({ publication }) => (
  <BlueLinkExt target="_blank" to={pubmedUrl(publication.pubmed)}>
    PubMed
  </BlueLinkExt>
)

export default PubMedLink
