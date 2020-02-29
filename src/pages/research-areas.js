import React from "react"
import { graphql } from "gatsby"
import CrumbLayout from "../components/crumblayout"

const ResearchAreas = props => {
  //const { data } = props

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["For Research Scientists", "/research-areas"],
      ]}
      title="Research Areas"
    ></CrumbLayout>
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
