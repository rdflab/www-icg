import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import flattenEdges from "../../utils/flattenedges"
import toPeopleMap from "../../utils/topeoplemap"

import LabSearch from "../../components/labsearch"

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
          postNominalLetters
          type
        }
      }
    }
  }
`
