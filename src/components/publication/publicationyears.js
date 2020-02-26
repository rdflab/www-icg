/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PublicationList from "./publicationlist"

const PublicationYears = ({ publications, labMap, peopleMap, showLabLink }) => {
  let yearMap = new Map()

  for (let publication of publications) {
    if (!yearMap.has(publication.year)) {
      yearMap.set(publication.year, [])
    }

    yearMap.get(publication.year).push(publication)
  }

  return (
    <>
      {Array.from(yearMap.keys())
        .sort()
        .reverse()
        .map((year, index) => {
          return (
            <div key={index}>
              <h2>{year}</h2>
              <PublicationList
                publications={yearMap.get(year)}
                labMap={labMap}
                peopleMap={peopleMap}
                showLabLink={showLabLink}
              />
            </div>
          )
        })}
    </>
  )
}

export default PublicationYears