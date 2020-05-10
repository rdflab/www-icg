import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
//import SideBar from "../components/sidebar/sidebar"
import SideBarNews from "../components/news/sidebarnews"
import HTMLDiv from "../components/htmldiv"
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
        <PeopleGroups
          groupMap={labGroupMap}
          faculty={faculty}
          cols={4}
          colWidth="w-2/10"
        />
      </Container>
    </CrumbLayout>
  )
}

export default LabPeopleTemplate
