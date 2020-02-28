import React from "react"
import Layout from "../components/layout"
import PeopleSearch from "../components/people/peoplesearch"

const ResearchAreaTemplate = props => {
  const { pageContext } = props
  const { labMap, allPeople, researchArea } = pageContext

  const people = []

  allPeople.map(person => {
    if (person.frontmatter.researchAreas.includes(researchArea.id)) {
      people.push(person)
    }
  })

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        [researchArea.name, `/research-areas/${researchArea.id}`],
      ]}
      title={researchArea.name}
    >
      <PeopleSearch labMap={labMap} allPeople={people} />
    </Layout>
  )
}

export default ResearchAreaTemplate
