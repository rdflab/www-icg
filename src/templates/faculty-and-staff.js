import React from "react"
import CrumbLayout from "../components/crumblayout"
import toLabMap from "../utils/tolabmap"
import PeopleSearch from "../components/people/peoplesearch"

const FacultyAndStaffTemplate = props => {
  const { pageContext } = props
  const { allLabs, allPeople } = pageContext
  const labMap = toLabMap(allLabs)

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
      ]}
      title="Faculty and Staff"
    >
      <PeopleSearch labMap={labMap} allPeople={allPeople} />
    </CrumbLayout>
  )
}

export default FacultyAndStaffTemplate
