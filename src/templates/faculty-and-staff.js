import React from "react"
import CrumbLayout from "../components/crumblayout"
import PeopleSearch from "../components/people/peoplesearch"

const FacultyAndStaffTemplate = props => {
  const { pageContext } = props
  const { groupMap, allPeople } = pageContext

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
      ]}
      title="Faculty and Staff"
    >
      <PeopleSearch groupMap={groupMap} allPeople={allPeople} />
    </CrumbLayout>
  )
}

export default FacultyAndStaffTemplate
