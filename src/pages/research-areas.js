import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import flattenEdges from "../utils/flattenedges"
import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"

const ResearchAreas = props => {
  const { data } = props
  const allPeople = flattenEdges(data.people.edges)
  const peopleMap = toPeopleMap(allPeople)
  const allLabs = toLabs(flattenEdges(data.labs.edges), peopleMap)
  const labMap = toLabMap(allLabs)

  return (
    <Layout crumbs={[["For Research Scientists", "/research-areas"]]}>
      <SEO title="Research Areas" />

      <h1>Research Areas</h1>
    </Layout>
  )
}

export default ResearchAreas

export const pageQuery = graphql`
  query {
    labs: allGroupsJson(filter: {type: {eq: "Lab"}}) {
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
