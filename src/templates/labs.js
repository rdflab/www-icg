import React from "react"
import Layout from "../components/layout"
import LabSearch from "../components/labsearch"

const LabsTemplate = props => {
  const { pageContext } = props
  const { allLabs, peopleMap } = pageContext

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Labs", "/research-areas/labs"],
      ]}
      title="Research Labs"
    >
      <LabSearch allLabs={allLabs} peopleMap={peopleMap} />
    </Layout>
  )
}

export default LabsTemplate
