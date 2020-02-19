import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import flattenEdges from "../utils/flattenedges"
import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"
import PeopleSearch from "../components/peoplesearch"
import Breadcrumb from "../components/breadcrumb"

const ResearchAreas = props => {
  const { data } = props
  const allPeople = flattenEdges(data.people.edges)
  const peopleMap = toPeopleMap(allPeople)
  const allLabs = toLabs(flattenEdges(data.labs.edges), peopleMap)
  const labMap = toLabMap(allLabs)

  return (
    <Layout>
      <SEO title="Research Areas" />

      <Breadcrumb crumbs={ [ ['For Research Scientists','/research-areas'] ] } />
    

      <h1>Research Areas</h1>
    </Layout>
  )
}

export default ResearchAreas

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
          email
          titles
          tags
        }
      }
    }
  }
`