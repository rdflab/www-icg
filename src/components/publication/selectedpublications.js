/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"
import { Link } from "gatsby"

const createPublications = (publications) => {
  let ret = []

  let c = 0

  // Outer loop to create parent
  for (let publication of publications) {
    if (publication.tags.includes("selected")) {
      ret.push(
        <Publication key={i} publication={publication} groupMap={groupMap} />
      )
      ++c
    }

    if (c == top) {
      break
    }
  }

  return ret
}

const SelectedPublications = ({ lab, publications, groupMap, top }) => {
  return (
    <>
      {createPublications(publications)}
      <Link
        to={`/research-areas/labs/${lab.id}/publications`}
        className="button is-primary"
      >
        More
      </Link>
    </>
  )
}

SelectedPublications.defaultProps = {
  top: 10,
}

export default SelectedPublications
