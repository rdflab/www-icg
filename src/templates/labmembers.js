import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import toLabMap from "../utils/tolabmap"
import PeopleSearch from "../components/peoplesearch"
import Title from "../components/title"

const LabMembersTemplate = props => {
  const { pageContext } = props
  const { lab, peopleMap } = pageContext
  const labMap = toLabMap([lab])

  const faculty = peopleMap[lab.leaders[0]]

  const people = []

  for (let pid of lab.members) {
    people.push(peopleMap[pid])
  }

  const title = `The ${faculty.firstName} ${faculty.lastName} Lab Members`

  return (
    <Layout
      crumbs={[
        ["For Research Scientists", "/research-areas"],
        ["Labs", "/research-areas/labs"],
        [
          `${faculty.firstName} ${faculty.lastName}`,
          `/research-areas/labs/${lab.id}`,
        ],
        ["Members", `/research-areas/labs/${lab.id}/members`],
      ]}
    >
      <SEO title={title} />

      <Title>{title}</Title>

      <PeopleSearch labMap={labMap} allPeople={people} showLabLink={false} />
    </Layout>
  )
}

export default LabMembersTemplate
