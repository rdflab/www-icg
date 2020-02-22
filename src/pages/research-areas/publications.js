import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import flattenEdges from "../../utils/flattenedges"
import toPeopleMap from "../../utils/topeoplemap"
import toLabMap from "../../utils/tolabmap"
import PubSearch from "../../components/pubsearch"

const Publications = props => {
  const { data } = props
  const peopleMap = toPeopleMap(flattenEdges(data.people.edges))
  const allLabs = flattenEdges(data.labs.edges)
  const labMap = toLabMap(allLabs)

  const allPublications = flattenEdges(data.publications.edges) //sort(flatten(data.publications.edges))

  return (
    <Layout crumbs={[
      ["For Research Scientists", "/research-areas"],["Publications", "/publications"]]}>
      <SEO title="Publications" />
      <h1>Publications</h1>

      <PubSearch
        labMap={labMap}
        peopleMap={peopleMap}
        allPublications={allPublications}
      />
    </Layout>
  )
}

export default Publications

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
          id
          firstName
          lastName
          titles
          type
          groups
        }
      }
    }

    publications: allPublicationsJson(
      sort: { fields: [year, title], order: [DESC, ASC] }
    ) {
      edges {
        node {
          authors {
            corresponding
            initials
            lastName
          }
          labs
          journal
          issue
          pages
          title
          volume
          year
          tags
          uri
        }
      }
    }
  }
`
