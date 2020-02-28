import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

const ResearchAreasTemplate = props => {
  const { pageContext } = props
  const { allResearchAreas } = pageContext

  const raMap = {}

  allResearchAreas.map(ra => {
    raMap[ra.name] = ra.id
  })

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
      ]}
      title="Research Areas"
    >
      {Object.keys(raMap)
        .sort()
        .map((name, index) => (
          <div key={index}>
            <Link to={`/research-areas/${raMap[name]}`}>{name}</Link>
          </div>
        ))}
    </Layout>
  )
}

export default ResearchAreasTemplate
