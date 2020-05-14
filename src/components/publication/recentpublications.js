/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"
import Button from "../../components/button"
import PublicationYears from "./publicationyears"

const RecentPublications = ({ lab, publications, top, className }) => {
  const createPublications = publications => {
    let ret = []

    // Outer loop to create parent
    for (let i = 0; i < Math.min(top, publications.length); ++i) {
      ret.push(<Publication key={i} publication={publications[i]} />)
    }

    return ret
  }

  return (
    <div className={`mb-4 ${className}`}>
      {/* <h2>Recent Publications</h2> */}
      <div className="mt-4">
        <PublicationYears publications={publications.slice(0, top)} />
        {/* {createPublications(publications)} */}
      </div>
      <div className="text-center">
        <Button to={`/research-areas/labs/${lab.id}/publications`}>More</Button>
      </div>
    </div>
  )
}

RecentPublications.defaultProps = {
  top: 5,
  className: "",
}

export default RecentPublications
