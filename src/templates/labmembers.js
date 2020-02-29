import React from "react"
import CrumbLayout from "../components/crumblayout"
import toLabMap from "../utils/tolabmap"
import PeopleSearch from "../components/people/peoplesearch"

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
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Labs", "/research-areas/labs"],
        [
          `${faculty.firstName} ${faculty.lastName}`,
          `/research-areas/labs/${lab.id}`,
        ],
        ["Members", `/research-areas/labs/${lab.id}/members`],
      ]}
      title={title}
    >
      <PeopleSearch labMap={labMap} allPeople={people} showLabLink={false} />
    </CrumbLayout>
  )
}

export default LabMembersTemplate
