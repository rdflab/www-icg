import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import CrumbLayout from "../components/crumblayout"
import PeopleSearch from "../components/people/peoplesearch"

const LabMembersTemplate = props => {
  const { pageContext } = props
  const { group, groupMap, peopleMap } = pageContext

  const faculty = peopleMap[group.leaders[0]]

  const people = []

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
        groupMap={groupMap}
        allPeople={people}
        showLabLink={false}
      />
    </CrumbLayout>
  )
}

export default LabMembersTemplate

// export const query = graphql`
//   query($id: String!) {
//     files(absolutePath: { regex: "/images/people/" }) {
//       relativePath
//       childImageSharp {
//         fluid(maxWidth: 500) {
//           ...GatsbyImageSharpFluid
//         }
//       }
//     }
//   }
// `
