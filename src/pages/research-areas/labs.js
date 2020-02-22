import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import flattenEdges from "../../utils/flattenedges"
import toPeopleMap from "../../utils/topeoplemap"

import LabSearch from "../../components/labsearch"

const EMPTY_QUERY = ""

const Labs = props => {
  const { data } = props
  const peopleMap = toPeopleMap(flattenEdges(data.people.edges))
  const allLabs = flattenEdges(data.labs.edges)

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["For Research Scientists", "/research-areas"],
        ["Labs", "/research-areas/labs"],
      ]}
    >
      <SEO title="Research Labs" />

      {/*in-line css for demo purposes*/}
      <h1>Research Labs</h1>

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
