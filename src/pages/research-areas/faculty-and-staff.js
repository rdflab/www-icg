import React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import flattenEdges from "../../utils/flattenedges"
import toLabMap from "../../utils/tolabmap"
import PeopleSearch from "../../components/person/peoplesearch"

const FacultyAndStaff = props => {
  const { data } = props
  const allPeople = flattenEdges(data.people.edges)
  const allLabs = flattenEdges(data.labs.edges)
  const labMap = toLabMap(allLabs)

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
      ]}
      title="Faculty and Staff"
    >
      <PeopleSearch labMap={labMap} allPeople={allPeople} />
    </Layout>
  )
}

export default FacultyAndStaff

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
          id
          firstName
          lastName
          email
          titles
          type
          groups
        }
      }
    }
  }
`
