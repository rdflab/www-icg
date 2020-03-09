import React from "react"
import CrumbLayout from "../components/crumblayout"
import BlueLink from "../components/bluelink"
import GlobalSearch from "../components/search/globalsearch"
import HideSmall from "../components/hidesmall"

const ResearchAreasV2Template = ({ pageContext }) => {
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
      headerComponent={
        <HideSmall className="w-1/3">
          <GlobalSearch searchData={searchData} />
        </HideSmall>
      }
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

export default ResearchAreasV2Template
