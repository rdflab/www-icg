import React from "react"
import { graphql } from "gatsby"
import Layout from "../src/components/layout"
import flattenEdges from "../src/utils/flattenedges"
import toPeopleMap from "../src/utils/topeoplemap"

import LabSearch from "../src/components/labsearch"

const Labs = props => {
  const { data } = props
  const peopleMap = toPeopleMap(flattenEdges(data.people.edges))
  const allLabs = flattenEdges(data.labs.edges)

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Labs", "/research-areas/labs"],
      ]}
      title="Research Labs"
    >
      <LabSearch allLabs={allLabs} peopleMap={peopleMap} />
    </Layout>
  )
}

export default Labs

export const pageQuery = graphql`
  query {
    labs: allGroupsJson(filter: { type: { eq: "Lab" } }) {
      edges {
        node {
          id
          name
          leaders
          members
          urls
        }
      }
    }

    people: allMarkdownRemark(
      sort: {
        fields: [frontmatter___lastName, frontmatter___firstName]
        order: [ASC, ASC]
      }
      filter: { frontmatter: { tags: { regex: "/People/" } } }
    ) {
      edges {
        node {
          frontmatter {
            id
            firstName
            lastName
            email
            phone
            researchAreas
            tags
            urls
          }
          excerpt(format: HTML)
          html
        }
      }
    }
  }
`
