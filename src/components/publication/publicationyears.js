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
import HideSmall from "../hidesmall"
import ShowSmall from "../showsmall"
import Card from "../card"

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
        .filter((year) => {
          return year !== -1
        })
        .map((year, index) => {
          return (
            <Column className="mb-8" key={year}>
              <Column className="justify-center">
                <ShowSmall className="text-white-95 bg-blue-400 p-2 mb-4">
                  <h4>{year}</h4>
                </ShowSmall>
                <HideSmall className="w-24 h-24 text-white-95 bg-blue-400 text-center py-8 mr-4">
                  <h4>{year}</h4>
                </HideSmall>
              </Column>
              <Column className="w-full md:w-11/12">
                <Card showCard={false}>
                  {/* <Card className="p-8"> */}
                  <PublicationList
                    publications={yearMap.get(year)}
                    showLabLink={showLabLink}
                  />
                  {/* </Card> */}
                </Card>
              </Column>
            </Column>

            // <div className="mb-8">
            //   <h3 className={`text-gray-700 mb-2`} key={`header-${year}`}>
            //     {year}
            //   </h3>
            //   <Card className="p-4 md:p-8">
            //     <PublicationList
            //       publications={yearMap.get(year)}
            //       showLabLink={showLabLink}
            //     />
            //   </Card>
            // </div>
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
