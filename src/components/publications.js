/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Publication from "./publication"

const Publications = ({ publications }) => (
  <>
    {publications.map(publication => (
      <Publication>{publication}</Publication>
    ))}
  </>
)

export default Publications
