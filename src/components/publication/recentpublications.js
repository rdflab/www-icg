/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"
import Button from "../../components/button"

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
      <h2>Recent Publications</h2>
      {createPublications(publications)}
      <div className="has-text-centered">
        <Button to={`/research-areas/labs/${lab.id}/publications`}>More</Button>
      </div>
    </>
  )
}

RecentPublications.defaultProps = {
  top: 5,
}

export default RecentPublications
