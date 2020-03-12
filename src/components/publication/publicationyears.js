/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PublicationList from "./publicationlist"
import SectionBreak from "../sectionbreak"

const PublicationYears = ({ publications, showLabLink }) => {
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
        .filter(year => {
          return year !== -1
        })
        .map((year, index) => {
          return (
            <SectionBreak title={year} key={index}>
              <PublicationList
                publications={yearMap.get(year)}
                showLabLink={showLabLink}
              />
            </SectionBreak>
          )
        })}
    </>
  )
}

PublicationYears.defaultProps = {
  showLabLink: false,
}

export default PublicationYears
