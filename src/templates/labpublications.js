import React from "react"
import Layout from "../components/layout"
import toLabMap from "../utils/tolabmap"
import PubSearch from "../components/publication/pubsearch"

const LabPublicationsTemplate = props => {
  const { pageContext } = props
  const { lab, peopleMap, allPublications } = pageContext
  const labMap = toLabMap([lab])

  const faculty = peopleMap[lab.leaders[0]]

  const publications = []

  allPublications.forEach(publication => {
    if (publication.labs.includes(lab.id)) {
      publications.push(publication)
    }
  })

  const title = `The ${faculty.firstName} ${faculty.lastName} Lab Publications`

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Labs", "/research-areas/labs"],
        [
          `${faculty.firstName} ${faculty.lastName}`,
          `/research-areas/labs/${lab.id}`,
        ],
        ["Publications", `/research-areas/labs/${lab.id}/publications`],
      ]}
      title={title}
    >
      <PubSearch
        labMap={labMap}
        peopleMap={peopleMap}
        allPublications={publications}
        showLabLink={false}
      />
    </Layout>
  )
}

export default LabPublicationsTemplate
