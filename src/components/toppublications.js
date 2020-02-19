/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"
import { Link } from "gatsby"

const TopPublications = ({lab, publications, labMap, top}) => {
  const createPublications = publications => {
    let ret = []

    // Outer loop to create parent
    for (let i = 0; i < Math.min(top, publications.length); ++i) {
      ret.push(<Publication key={i} publication={publications[i]} labMap={labMap} />)
    }

    return ret
  }

  return(
    <>
      {createPublications(publications)}
      <Link to={`/research-areas/labs/${lab.id}/publications`} className="button is-primary">More</Link>
    </>
  )
}

TopPublications.defaultProps = {
  top: 10
}

export default TopPublications
