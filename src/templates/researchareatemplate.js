import React from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import { graphql } from "gatsby"
import SiteSearch from "../components/search/sitesearch"
import toPeopleGroupMap from "../utils/peoplegroupmap"
import PeopleGroups from "../components/people/peoplegroups"

const ResearchAreaTemplate = ({ data, pageContext }) => {
  const { allPeople, researchArea } = pageContext

  //const imageMap = toImageMap(data.files)

  const people = allPeople.filter(person => {
    return person.frontmatter.researchAreas.includes(researchArea.id)
  })

  const groupMap = toPeopleGroupMap(people)

  return (
    <CrumbContainerLayout
      crumbs={[
        ["Research Areas", "/research-areas"],
        [researchArea.name, `/research-areas/${researchArea.id}`],
      ]}
      title={researchArea.name}
      headerComponent={<SiteSearch />}
    >
      <PeopleGroups groupMap={groupMap} showLabLink={true} />
    </CrumbContainerLayout>
  )
}

export default ResearchAreaTemplate

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
