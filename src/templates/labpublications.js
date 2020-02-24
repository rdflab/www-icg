import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import toLabMap from "../utils/tolabmap"
import PubSearch from "../components/pubsearch"
import Breadcrumb from "../components/breadcrumb"
import Title from "../components/title"

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
    <Layout>
      <SEO title={title} />

      <Breadcrumb
        crumbs={[
          ["For Research Scientists", "/research-areas"],
          ["Labs", "/research-areas/labs"],
          [
            `${faculty.firstName} ${faculty.lastName}`,
            `/research-areas/labs/${lab.id}`,
          ],
          ["publications", `/research-areas/labs/${lab.id}/publications`],
        ]}
      />

      <Title>{title}</Title>

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
