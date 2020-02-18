/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Publication from "./publication"

const PublicationList = ({publications, peopleMap}) => (
  <>
    {publications.map((publication, index) => (
      <Publication key={index} publication={publication} peopleMap={peopleMap} />
    ))}
  </>
)

export default PublicationList
