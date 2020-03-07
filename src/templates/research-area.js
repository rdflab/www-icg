import React from "react"
import CrumbLayout from "../components/crumblayout"
import PeopleSearch from "../components/people/peoplesearch"

const ResearchAreaTemplate = props => {
  const { pageContext } = props
  const { groupMap, allPeople, researchArea } = pageContext

  const people = allPeople.filter(person => {
    return person.frontmatter.researchAreas.includes(researchArea.id)
  })

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        [researchArea.name, `/research-areas/${researchArea.id}`],
      ]}
      title={researchArea.name}
    >
      <PeopleSearch groupMap={groupMap} allPeople={people} />
    </CrumbLayout>
  )
}

export default ResearchAreaTemplate
