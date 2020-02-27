import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const ResearchAreas = props => {
  //const { data } = props

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["For Research Scientists", "/research-areas"],
      ]}
      title="Research Areas"
    ></Layout>
  )
}

export default ResearchAreas

export const pageQuery = graphql`
  query {
    labs: allGroupsJson(filter: { type: { eq: "Lab" } }) {
      edges {
        node {
          id
          name
          leaders
          members
        }
      }
    }
  }
`
