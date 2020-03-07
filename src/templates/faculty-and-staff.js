import React from "react"
import { graphql } from "gatsby"
import CrumbLayout from "../components/crumblayout"
import PeopleSearch from "../components/people/peoplesearch"
import toImageMap from "../utils/toimagemap"

const FacultyAndStaffTemplate = ({ data, pageContext }) => {
  const { groupMap, allPeople } = pageContext

  const imageMap = toImageMap(data.files)

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
      ]}
      title="Faculty and Staff"
    >
      <PeopleSearch
        groupMap={groupMap}
        allPeople={allPeople}
        imageMap={imageMap}
      />
    </CrumbLayout>
  )
}

export default FacultyAndStaffTemplate

export const query = graphql`
  query {
    files: allFile(
      filter: {
        absolutePath: { regex: "/images/people/" }
        ext: { eq: ".jpg" }
      }
    ) {
      edges {
        node {
          name
          relativePath
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
