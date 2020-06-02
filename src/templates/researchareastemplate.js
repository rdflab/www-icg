import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import BlueLink from "../components/bluelink"
import SiteSearch from "../components/search/sitesearch"
import Container from "../components/container"
import Column from "../components/column"
import FullDiv from "../components/fulldiv"

const FlatCard = ({ children, className }) => (
  <div
    className={`bg-white border border-solid border-gray-300 rounded-md overflow-hidden ${className}`}
  >
    {children}
  </div>
)

FlatCard.defaultProps = {
  className: "",
}

const ResearchAreasTemplate = ({ pageContext }) => {
  const { allResearchAreas } = pageContext

  const raMap = {}

  allResearchAreas.map(ra => {
    raMap[ra.name] = ra.id
  })

  return (
    <CrumbTitleLayout
      crumbs={[["Research Areas", "/research-areas"]]}
      nav="For Research Scientists"
      title="Research Areas"
      headerComponent={<SiteSearch />}
    >
      <Container>
        <Column className="items-center justify-between my-8">
          <Column className="md:w-5/10">
            <FullDiv className="border-t-4 border-b-4 border-solid border-gray-400 py-4">
              <h3>Research Faculty</h3>
              <p className="my-2">
                Browse a complete listing of our research faculty by name.
              </p>

              <BlueLink to="/research-areas/faculty">Learn more</BlueLink>
            </FullDiv>
          </Column>
        </Column>

        <Column className="items-center justify-between my-8">
          <Column className="md:w-5/10">
            <FullDiv className="border-t-4 border-b-4 border-solid border-gray-400 py-4">
              <h3>Research Staff</h3>
              <p className="my-2">
                Browse a complete listing of our research staff by name.
              </p>

              <BlueLink to="/research-areas/faculty-staff">Learn more</BlueLink>
            </FullDiv>
          </Column>
        </Column>

        <Column className="items-center justify-between my-8">
          <Column className="md:w-5/10">
            <FullDiv className="border-t-4 border-b-4 border-solid border-gray-400 py-4">
              <h3>Research Labs</h3>
              <p className="my-2">
                Browse our laboratories to learn more about the leading-edge
                research taking place at the institute.
              </p>

              <BlueLink to="/research-areas/labs">Learn more</BlueLink>
            </FullDiv>
          </Column>
        </Column>
      </Container>
      {/* 
      {Object.keys(raMap)
        .sort()
        .map((name, index) => (
          <FlatCard
            key={index}
            className="items-center justify-center text-center m-16 p-8"
          >
            <h2>
              <BlueLink to={`/research-areas/${raMap[name]}`}>{name}</BlueLink>
            </h2>
          </FlatCard>
        ))} */}
    </CrumbTitleLayout>
  )
}

export default ResearchAreasTemplate
