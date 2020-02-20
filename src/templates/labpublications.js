import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"
import PubSearch from "../components/pubsearch"
import Breadcrumb from "../components/breadcrumb"

const LabPublicationsTemplate = props => {
  const { data, pageContext } = props
  const { lab, allPeople, allPublications } = pageContext
  const peopleMap = toPeopleMap(allPeople)
  const labs = toLabs([lab], peopleMap)
  const labMap = toLabMap(labs)

  const faculty = peopleMap.get(lab.faculty)

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

      <h1>{title}</h1>

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
