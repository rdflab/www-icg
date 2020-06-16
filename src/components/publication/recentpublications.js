/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
//import Button from "../../components/button"
//import PublicationYears from "./publicationyears"
import PublicationList from "./publicationlist"
import useSiteMetadata from "../../hooks/sitemetadata"

const RecentPublications = ({ publications, top, className }) => {
  // const createPublications = publications => {
  //   let ret = []

  //   // Outer loop to create parent
  //   for (let i = 0; i < Math.min(top, publications.length); ++i) {
  //     ret.push(<Publication key={i} publication={publications[i]} />)
  //   }

  //   return ret
  // }

  return (
    <div className={`mb-4 ${className}`}>
      {/* <h2>Recent Publications</h2> */}
      <div className="mt-4">
        <PublicationList publications={publications.slice(0, top)} />
      </div>
      {/* <div className="text-center">
        <Button to={`${paths.labsPath}/${lab.id}/publications`}>
          More Publications
        </Button>
      </div> */}
    </div>
  )
}

RecentPublications.defaultProps = {
  top: 5,
  className: "",
}

export default RecentPublications
