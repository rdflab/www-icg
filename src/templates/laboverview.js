import React from "react"
import CrumbLayout from "../components/crumblayout"

import Columns from "../components/columns"
import Column from "../components/column"
import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/people/sidebarmembers"

const LabOverviewTemplate = props => {
  const { pageContext } = props
  const { lab, labPeople, peopleMap, labPublications, labHtml } = pageContext

  const faculty = peopleMap[lab.leaders[0]]

  const crumbs = [
    ["Home", "/"],
    ["Research Areas", "/research-areas"],
    ["Labs", "/research-areas/labs"],
    [
      `${faculty.firstName} ${faculty.lastName}`,
      `/research-areas/labs/${lab.id}`,
    ],
    [`Overview`, `/research-areas/labs/${lab.id}/overview`],
  ]

  return (
    <CrumbLayout crumbs={crumbs} title={`The ${faculty.lastName} Lab Overview`}>
      <Columns>
        <Column>
          <div dangerouslySetInnerHTML={{ __html: labHtml }} />
        </Column>
        <Column w={4}>
          <SideBar>
            <SideBarMembers lab={lab} people={labPeople} />
          </SideBar>
        </Column>
      </Columns>
    </CrumbLayout>
  )
}

export default LabOverviewTemplate
