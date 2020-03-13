import React from "react"
import Layout from "../components/layout"
import CrumbLayout from "../components/crumblayout"
import BlueLink from "../components/bluelink"
import WhiteLink from "../components/whitelink"
import SiteSearch from "../components/search/sitesearch"
import Container from "../components/container"
import Title from "../components/title"
import Card from "../components/card"

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
          <Card className="items-center justify-center text-center p-16 m-16">
            <h2>
          <BlueLink to={`/research-areas/${raMap[name]}`}>{name}</BlueLink>
        </h2>
        </Card>
          
        ))}
    </CrumbLayout>
  )
}

export default ResearchAreasTemplate
