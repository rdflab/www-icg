import React from "react"
import Layout from "../components/layout"
import toLabMap from "../utils/tolabmap"
import PubSearch from "../components/publication/pubsearch"

const PublicationsTemplate = props => {
  const { pageContext } = props
  const { allLabs, peopleMap, allPublications } = pageContext
  const labMap = toLabMap(allLabs)

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Publications", "/research-areas/publications"],
      ]}
      selectedTab="Publications"
      title="Publications"
    >
      <PubSearch
        labMap={labMap}
        peopleMap={peopleMap}
        allPublications={allPublications}
      />
    </Layout>
  )
}

export default PublicationsTemplate
