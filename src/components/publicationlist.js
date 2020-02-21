/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"

const PublicationList = ({ publications, labMap, peopleMap, showLabLink }) => (
  <>
    {publications.map((publication, index) => (
      <Publication
        key={index}
        publication={publication}
        labMap={labMap}
        peopleMap={peopleMap}
        showLabLink={showLabLink}
      />
    ))}
  </>
)

export default PublicationList
