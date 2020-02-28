import React from "react"
import Layout from "../components/layout"
import toLabMap from "../utils/tolabmap"
import PeopleSearch from "../components/people/peoplesearch"

const FacultyAndStaffTemplate = props => {
  const { pageContext } = props
  const { allLabs, allPeople } = pageContext
  const labMap = toLabMap(allLabs)

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
      ]}
      title="Faculty and Staff"
    >
      <PeopleSearch labMap={labMap} allPeople={allPeople} />
    </Layout>
  )
}

export default FacultyAndStaffTemplate
