import React from "react"
import CrumbLayout from "../components/crumblayout"

import Column from "../components/column"
//import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/people/sidebarmembers"
import SideColumn from "../components/sidecolumn"
import MainColumn from "../components/maincolumn"
import HTMLDiv from "../components/htmldiv"
import { personName } from "../utils/personname"
import { labName } from "../utils/labname"

const LabOverviewTemplate = ({ pageContext }) => {
  const { group, labPeople, labPublications, labHtml } = pageContext

  const faculty = group.leaders[0]

  const title = labName(faculty)

  const crumbs = [
    ["Research Areas", "/research-areas"],
    ["Labs", "/research-areas/labs"],
    [personName(faculty), `/research-areas/labs/${group.frontmatter.id}`],
    [`Overview`, `/research-areas/labs/${group.frontmatter.id}/overview`],
  ]

  return (
    <CrumbLayout crumbs={crumbs} title={`${title} Overview`}>
      <Column>
        <MainColumn>
          <HTMLDiv html={labHtml} />
        </MainColumn>
        <SideColumn>
          {/* <SideBar> */}
          <SideBarMembers group={group} people={labPeople} />
          {/* </SideBar> */}
        </SideColumn>
      </Column>
    </CrumbLayout>
  )
}

export default LabOverviewTemplate
