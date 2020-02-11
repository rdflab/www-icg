/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"

const Publication = ({publication}) => (
  <>
    <div>{publication.title}</div>
  </>
)

export default Publication
