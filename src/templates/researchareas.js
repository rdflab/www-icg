import React from "react"
import CrumbLayout from "../components/crumblayout"
import BlueLink from "../components/bluelink"
import SiteSearch from "../components/search/sitesearch"
import HideSmall from "../components/hidesmall"

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
      headerComponent={<SiteSearch searchData={searchData} />}
    >
      {Object.keys(raMap)
        .sort()
        .map((name, index) => (
          <div key={index}>
            <h2>
              <BlueLink to={`/research-areas/${raMap[name]}`}>{name}</BlueLink>
            </h2>
          </div>
        ))}
    </CrumbLayout>
  )
}

export default ResearchAreasTemplate
