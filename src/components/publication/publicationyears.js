/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PublicationList from "./publicationlist"
import SectionBreak from "../sectionbreak"
import Column from "../column"
import H2 from "../headings/h2"

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
            <Column className="mb-8">
              <Column w={2} className="pr-8">
                <div className="row items-center justify-end h-16 w-full">
                  <h2 className="text-blue-600">{year}</h2>
                </div>
              </Column>
              <Column w={10} className="p-8 bg-white shadow">
                <div>
                  <PublicationList
                    publications={yearMap.get(year)}
                    showLabLink={showLabLink}
                  />
                </div>
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
