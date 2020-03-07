import React from "react"
import CrumbLayout from "../components/crumblayout"

import Columns from "../components/columns"
//import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/people/sidebarmembers"
import SideColumn from "../components/sidecolumn"
import MainColumn from "../components/maincolumn"
import HTMLDiv from "../components/htmldiv"

const LabOverviewTemplate = props => {
  const { pageContext } = props
  const { group, labPeople, peopleMap, labPublications, labHtml } = pageContext

  const faculty = peopleMap[group.leaders[0]]

  const title = `The ${faculty.frontmatter.lastName} Lab`

  const crumbs = [
    ["Home", "/"],
    ["Research Areas", "/research-areas"],
    ["Labs", "/research-areas/labs"],
    [title, `/research-areas/labs/${group.id}`],
    [`Overview`, `/research-areas/labs/${group.id}/overview`],
  ]

  return (
    <CrumbLayout crumbs={crumbs} title={`${title} Overview`}>
      <Columns>
        <MainColumn>
          <HTMLDiv html={labHtml} />
        </MainColumn>
        <SideColumn>
          {/* <SideBar> */}
          <SideBarMembers group={group} people={labPeople} />
          {/* </SideBar> */}
        </SideColumn>
      </Columns>
    </CrumbLayout>
  )
}

export default LabOverviewTemplate
