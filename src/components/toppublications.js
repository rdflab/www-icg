/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Publication from "./publication"

const TopPublications = ({publications}) => {
  const createPublications = (publications) => {
    let ret = []

    // Outer loop to create parent
    for (let i = 0; i < Math.min(10, publications.length); ++i) {
      ret.push(<Publication publication={publications[i]} />)
    }

    return ret
  }

  return(
    <>
      {createPublications(publications)}
    </>
  )
}

export default TopPublications
