import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"

//import SideBar from "../components/sidebar/sidebar"
import SiteSearch from "../components/search/sitesearch"
import { personName } from "../utils/personname"
import Container from "../components/container"
import PersonHeader from "../components/people/personheader"
import PeopleGroups from "../components/people/peoplegroups"
import { labName } from "../utils/labname"

const LabPeopleTemplate = ({ path, pageContext }) => {
  const { lab, faculty } = pageContext

  const title = labName(faculty)

  const crumbs = [
    ["Labs", "/research-areas/labs"],
    [personName(faculty), `/research-areas/labs/${lab.id}`],
    ["People", `/research-areas/labs/${lab.id}/people`],
  ]

  return (
    <CrumbTitleLayout
      path={path}
      crumbs={crumbs}
      title={title}
      headerContent={<SiteSearch />}
    >
      <PersonHeader person={faculty} title="Labs" />
      <div className="bg-columbia-light-gray py-8">
        <Container>
          <PeopleGroups groupMap={lab.groupMap} faculty={faculty} />
        </Container>
      </div>
    </CrumbTitleLayout>
  )
}

export default LabPeopleTemplate
