import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"
import PeopleSearch from "../components/peoplesearch"

const LabMembersTemplate = props => {
  const { data, pageContext } = props
  const { lab, allPeople } = pageContext
  const peopleMap = toPeopleMap(allPeople)
  const labs = toLabs([lab], peopleMap)
  const labMap = toLabMap(labs)

  const faculty = peopleMap.get(lab.faculty)

  const people = []

  allPeople.forEach(person => {
    if (person.labs.includes(lab.id)) {
      people.push(person)
    }
  })

  console.log("cake", people)

  const title = `The ${faculty.firstName} ${faculty.lastName} Lab Members`

  return (
    <Layout crumbs={[
      ["For Research Scientists", "/research-areas"],
      ["Labs", "/research-areas/labs"],
      [
        `${faculty.firstName} ${faculty.lastName}`,
        `/research-areas/labs/${lab.id}`,
      ],
      ["members", `/research-areas/labs/${lab.id}/members`],
    ]}>
      <SEO title={title} />

      <h1>{title}</h1>

      <PeopleSearch labMap={labMap} allPeople={people} showLabLink={false} />
    </Layout>
  )
}

export default LabMembersTemplate
