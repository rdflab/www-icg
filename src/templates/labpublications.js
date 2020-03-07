import React from "react"
import CrumbLayout from "../components/crumblayout"
import toGroupMap from "../utils/togroupmap"
import PubSearch from "../components/publication/pubsearch"

const LabPublicationsTemplate = props => {
  const { pageContext } = props
  const { group, peopleMap, allPublications } = pageContext
  const groupMap = toGroupMap([group])

  const faculty = peopleMap[group.leaders[0]]

  const publications = []

  allPublications.forEach(publication => {
    if (publication.groups.includes(group.id)) {
      publications.push(publication)
    }
  })

  const title = `The ${faculty.frontmatter.lastName} Lab Publications`

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Labs", "/research-areas/labs"],
        [
          `${faculty.firstName} ${faculty.lastName}`,
          `/research-areas/labs/${group.id}`,
        ],
        ["Publications", `/research-areas/labs/${group.id}/publications`],
      ]}
      title={title}
    >
      <PubSearch
        groupMap={groupMap}
        peopleMap={peopleMap}
        allPublications={publications}
        showLabLink={false}
      />
    </CrumbLayout>
  )
}

export default LabPublicationsTemplate
