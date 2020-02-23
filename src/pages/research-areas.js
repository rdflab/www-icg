import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ResearchAreas = props => {
  const { data } = props

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["For Research Scientists", "/research-areas"],
      ]}
    >
      <SEO title="Research Areas" />

      <h1>Research Areas</h1>
    </Layout>
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

    people: allPeopleJson {
      edges {
        node {
          groups
          id
          firstName
          lastName
          email
          titles
          tags
        }
      }
    }
  }
`
