import React from "react"
import CrumbLayout from "../components/crumblayout"
import BlueLink from "../components/bluelink"
import SiteSearch from "../components/search/sitesearch"

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
  const { allResearchAreas, searchData } = pageContext

  const raMap = {}

  allResearchAreas.map(ra => {
    raMap[ra.name] = ra.id
  })

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
      ]}
      title="Research Areas"
      headerComponent={<SiteSearch />}
    >
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
    </CrumbLayout>
  )
}

export default ResearchAreasTemplate
