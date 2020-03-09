import React from "react"
import CrumbLayout from "../components/crumblayout"
import PeopleTypes from "../components/people/peopletypes"
import { graphql } from "gatsby"
import toImageMap from "../utils/toimagemap"
import GlobalSearch from "../components/search/globalsearch"
import HideSmall from "../components/hidesmall"

const ResearchAreaV2Template = ({ data, pageContext }) => {
  const { groupMap, allPeople, researchArea, searchData } = pageContext

  const imageMap = toImageMap(data.files)

  const people = allPeople.filter(person => {
    return person.frontmatter.researchAreas.includes(researchArea.id)
  })

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        [researchArea.name, `/research-areas/${researchArea.id}`],
      ]}
      title={researchArea.name}
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

export default ResearchAreaV2Template

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
