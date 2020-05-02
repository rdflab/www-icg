import React from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import BlueLink from "../components/bluelink"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"

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
    <CrumbContainerLayout
      crumbs={[["Research Areas", "/research-areas"]]}
      title="Research Areas"
      headerComponent={<SiteSearch />}
    >
      <H1>Research Areas</H1>

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
        ))}
    </CrumbContainerLayout>
  )
}

export default ResearchAreasTemplate
