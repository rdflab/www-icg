import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import flattenEdges from "../utils/flattenedges"
import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"
import PubSearch from "../components/pubsearch"
import Breadcrumb from "../components/breadcrumb"

const News = props => {
  const { data } = props
  const peopleMap = toPeopleMap(flattenEdges(data.people.edges))
  const allLabs = toLabs(flattenEdges(data.labs.edges), peopleMap)
  const labMap = toLabMap(allLabs)

  const allPublications = flattenEdges(data.publications.edges) //sort(flatten(data.publications.edges))
  
  return (
    <Layout>
      <SEO title="News" />

      <Breadcrumb crumbs={ [ ['News','/news'] ] } />

      <h1>News</h1>

      <PubSearch labMap={labMap} peopleMap={peopleMap} allPublications={allPublications} />
    </Layout>
  )
}

export default News

export const pageQuery = graphql`
  query {
    labs: allLabsJson {
      edges {
        node {
          id
          name
          faculty
        }
      }
    }

    people: allPeopleJson {
      edges {
        node {
          labs
          id
          firstName
          lastName
          titles
          tags
        }
      }
    }

    publications: allPublicationsJson(sort: {fields: [year, title], order: [DESC, ASC]}) {
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
        }
      }
    }
  }
`