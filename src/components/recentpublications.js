/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"
import { Link } from "gatsby"

const RecentPublications = ({ lab, publications, labMap, peopleMap, top }) => {
  const createPublications = publications => {
    let ret = []

    // Outer loop to create parent
    for (let i = 0; i < Math.min(top, publications.length); ++i) {
      ret.push(
        <Publication
          key={i}
          publication={publications[i]}
          labMap={labMap}
          peopleMap={peopleMap}
        />
      )
    }

    return ret
  }

  return (
    <>
      {createPublications(publications)}
      <Link
        to={`/research-areas/labs/${lab.id}/publications`}
        className="button is-link"
      >
        More
      </Link>
    </>
  )
}

RecentPublications.defaultProps = {
  top: 10,
}

export default RecentPublications
