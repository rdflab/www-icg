/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"

const SelectedPublications = ({ id, publications, top }) => {
  let ret = []

  let c = 0

  const tagId = `${id}:selected`

  // Outer loop to create parent
  for (let publication of publications) {
    if (publication.tags.includes(tagId)) {
      ret.push(<Publication key={c} publication={publication} />)
      ++c
    }

    if (c === top) {
      break
    }
  }

  return ret
}

SelectedPublications.defaultProps = {
  top: 10,
}

export default SelectedPublications
