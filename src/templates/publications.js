import React from "react"
import CrumbLayout from "../components/crumblayout"
import PubSearch from "../components/publication/pubsearch"

const PublicationsTemplate = props => {
  const { pageContext } = props
  const { groupMap, peopleMap, allPublications } = pageContext

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Publications", "/research-areas/publications"],
      ]}
      selectedTab="Publications"
      title="Publications"
    >
      <PubSearch
        groupMap={groupMap}
        peopleMap={peopleMap}
        allPublications={allPublications}
      />
    </CrumbLayout>
  )
}

export default PublicationsTemplate
