import React from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import PeopleTypes from "../components/people/peopletypes"
import { graphql } from "gatsby"
import toImageMap from "../utils/toimagemap"
import SiteSearch from "../components/search/sitesearch"

const ResearchAreaTemplate = ({ data, pageContext }) => {
  const { allPeople, peopleMap, researchArea } = pageContext

  const imageMap = toImageMap(data.files)

  const people = allPeople.filter(person => {
    return person.frontmatter.researchAreas.includes(researchArea.id)
  })

  return (
    <CrumbContainerLayout
      crumbs={[
        ["Research Areas", "/research-areas"],
        [researchArea.name, `/research-areas/${researchArea.id}`],
      ]}
      title={researchArea.name}
      headerComponent={<SiteSearch />}
    >
      <PeopleTypes
        imageMap={imageMap}
        allPeople={people}
        peopleMap={peopleMap}
        showLabLink={true}
      />
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
