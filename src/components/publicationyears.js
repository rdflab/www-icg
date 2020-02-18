/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Publication from "./publication"
import PublicationList from "./publicationlist"

const PublicationYears = ({publications, peopleMap}) => {
  
  let yearMap = new Map()

  for (let publication of publications) {
    if (!yearMap.has(publication.year)) {
      yearMap.set(publication.year, new Array())
    }

    yearMap.get(publication.year).push(publication)
  }

  let comps = []

  for (let year of Array.from(yearMap.keys()).sort().reverse()) {
    comps.push(<h1>{year}</h1>)
    comps.push(<PublicationList publications={yearMap.get(year)} peopleMap={peopleMap} />)
  }

  return(
    <>
      {comps}
    </>
  )
}

export default PublicationYears
