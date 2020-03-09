import React from "react"
import { graphql } from "gatsby"
import CrumbLayout from "../components/crumblayout"
import toImageMap from "../utils/toimagemap"
import PeopleTypes from "../components/people/peopletypes"
import HideSmall from "../components/hidesmall"
import GlobalSearch from "../components/search/globalsearch"

const LabMembersTemplate = ({ pageContext, data }) => {
  const { group, groupMap, peopleMap, searchData } = pageContext

  const faculty = peopleMap[group.frontmatter.leaders[0]]

  const people = []

  const imageMap = toImageMap(data.files)

  for (let pid of group.frontmatter.members) {
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
          `/research-areas/labs/${group.frontmatter.id}`,
        ],
        ["Members", `/research-areas/labs/${group.frontmatter.id}/members`],
      ]}
      title={title}
      headerComponent={
        <HideSmall className="w-1/3">
          <GlobalSearch searchData={searchData} />
        </HideSmall>
      }
    >
      <PeopleTypes
        imageMap={imageMap}
        allPeople={people}
        groupMap={groupMap}
        showLabLink={true}
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
