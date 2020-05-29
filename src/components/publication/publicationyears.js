/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PublicationList from "./publicationlist"
import Column from "../column"
import FullDiv from "../fulldiv"

const PublicationYears = ({ publications, sectionMode, showLabLink }) => {
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
            <Column className="mb-8" key={year}>
              <Column className="w-1/10 justify-end mr-8">
                <h2 className="text-blue-600">{year}</h2>
              </Column>
              <Column className="w-9/10">
                <FullDiv>
                  <PublicationList
                    publications={yearMap.get(year)}
                    showLabLink={showLabLink}
                  />
                </FullDiv>
              </Column>
            </Column>
          )
        })}
    </>
  )
}

PublicationYears.defaultProps = {
  sectionMode: "main",
  showLabLink: false,
}

export default PublicationYears
