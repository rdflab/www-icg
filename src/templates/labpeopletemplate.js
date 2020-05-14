import React from "react"
import CrumbLayout from "../components/crumblayout"

//import SideBar from "../components/sidebar/sidebar"
import SiteSearch from "../components/search/sitesearch"
import { personName } from "../utils/personname"
import Container from "../components/container"
import PersonHeader from "../components/people/personheader"
import PeopleGroups from "../components/people/peoplegroups"
import { labName } from "../utils/labname"

const LabPeopleTemplate = ({ pageContext }) => {
  const { lab, faculty, labGroupMap } = pageContext

  const title = labName(faculty)

  const crumbs = [
    ["Labs", "/research-areas/labs"],
    [personName(faculty), `/research-areas/labs/${lab.id}`],
    ["People", `/research-areas/labs/${lab.id}/people`],
  ]

  return (
    <CrumbLayout crumbs={crumbs} title={title} headerComponent={<SiteSearch />}>
      <PersonHeader person={faculty} title="Labs" />

      <Container>
        <PeopleGroups groupMap={labGroupMap} faculty={faculty} />
      </Container>
    </CrumbLayout>
  )
}

export default LabPeopleTemplate
