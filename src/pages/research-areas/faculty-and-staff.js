import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import flattenEdges from "../../utils/flattenedges"
import toLabMap from "../../utils/tolabmap"
import PeopleSearch from "../../components/peoplesearch"
import Title from "../../components/title"

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
    >
      <SEO title="Faculty and Staff" />

      <Title>Faculty and Staff</Title>

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
