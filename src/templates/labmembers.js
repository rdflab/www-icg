import React from "react"
import { graphql } from "gatsby"
import CrumbLayout from "../components/crumblayout"
import PeopleSearch from "../components/people/peoplesearch"
import toImageMap from "../utils/toimagemap"

const LabMembersTemplate = ({ pageContext, data }) => {
  const { group, groupMap, peopleMap } = pageContext

  const faculty = peopleMap[group.leaders[0]]

  const people = []

  const imageMap = toImageMap(data.files)

  for (let pid of group.members) {
    people.push(peopleMap[pid])
  }

  const title = `The ${faculty.frontmatter.lastName} Lab Members`

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Labs", "/research-areas/labs"],
        [
          `${faculty.frontmatter.firstName} ${faculty.frontmatter.lastName}`,
          `/research-areas/labs/${group.id}`,
        ],
        ["Members", `/research-areas/labs/${group.id}/members`],
      ]}
      title={title}
    >
      <PeopleSearch
        imageMap={imageMap}
        groupMap={groupMap}
        allPeople={people}
        showLabLink={false}
      />
    </CrumbLayout>
  )
}

export default LabMembersTemplate

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
