import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import flattenEdges from "../../utils/flattenedges"
import toPeopleMap from "../../utils/topeoplemap"
import toLabs from "../../utils/tolabs"
import toLabMap from "../../utils/tolabmap"
import PeopleSearch from "../../components/peoplesearch"
import Breadcrumb from "../../components/breadcrumb"

const FacultyAndStaff = props => {
  const { data } = props
  const allPeople = flattenEdges(data.people.edges)
  const peopleMap = toPeopleMap(allPeople)
  const allLabs = toLabs(flattenEdges(data.labs.edges), peopleMap)
  const labMap = toLabMap(allLabs)

  return (
    <Layout crumbs={[
      ["For Research Scientists", "/research-areas"],
      ["Faculty and Staff", "/research-areas/faculty-and-staff"],
    ]}>
      <SEO title="Research Faculty and Staff" />

      <h1>Research Faculty and Staff</h1>

      <PeopleSearch labMap={labMap} allPeople={allPeople} />
    </Layout>
  )
}

export default FacultyAndStaff

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
