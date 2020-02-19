import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"
import PubSearch from "../components/pubsearch"

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

      <h1>{title}</h1>

      <PubSearch labMap={labMap} peopleMap={peopleMap} allPublications={publications} showLabLink={false} />

    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    publications: allPublicationsJson(sort: {fields: [year, title], order: [DESC, ASC]}) {
      edges {
        node {
          authors {
            corresponding
            initials
            lastName
          }
          labs
          journal
          issue
          pages
          title
          volume
          year
        }
      }
    }
  }
`

export default LabPublicationsTemplate