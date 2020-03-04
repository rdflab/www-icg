import React from "react"
import CrumbLayout from "../components/crumblayout"

import Columns from "../components/columns"
//import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/people/sidebarmembers"
import SideColumn from "../components/sidecolumn"
import MainColumn from "../components/maincolumn"

const LabOverviewTemplate = props => {
  const { pageContext } = props
  const { lab, labPeople, peopleMap, labPublications, labHtml } = pageContext

  const faculty = peopleMap[lab.leaders[0]]

  const crumbs = [
    ["Home", "/"],
    ["Research Areas", "/research-areas"],
    ["Labs", "/research-areas/labs"],
    [
      `${faculty.frontmatter.firstName} ${faculty.frontmatter.lastName}`,
      `/research-areas/labs/${lab.id}`,
    ],
    [`Overview`, `/research-areas/labs/${lab.id}/overview`],
  ]

  return (
    <CrumbLayout
      crumbs={crumbs}
      title={`The ${faculty.frontmatter.lastName} Lab Overview`}
    >
      <Columns>
        <MainColumn>
          <div dangerouslySetInnerHTML={{ __html: labHtml }} />
        </MainColumn>
        <SideColumn>
          {/* <SideBar> */}
          <SideBarMembers lab={lab} people={labPeople} />
          {/* </SideBar> */}
        </SideColumn>
      </Columns>
    </CrumbLayout>
  )
}

export default LabOverviewTemplate
