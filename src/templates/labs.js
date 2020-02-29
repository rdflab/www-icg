import React from "react"
import CrumbLayout from "../components/crumblayout"
import LabSearch from "../components/labsearch"

const LabsTemplate = props => {
  const { pageContext } = props
  const { allLabs, peopleMap } = pageContext

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Labs", "/research-areas/labs"],
      ]}
      title="Research Labs"
    >
      <LabSearch allLabs={allLabs} peopleMap={peopleMap} />
    </CrumbLayout>
  )
}

export default LabsTemplate
