import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Columns from "../components/columns"
import Column from "../components/column"
import SideBar from "../components/sidebar"
import SideBarMembers from "../components/sidebarmembers"

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
    [
      `${faculty.firstName} ${faculty.lastName} Overview`,
      `/research-areas/labs/${lab.id}/overview`,
    ],
  ]

  return (
    <Layout crumbs={crumbs}>
      <SEO title={`The ${faculty.lastName} Lab Overview`} />
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
    </Layout>
  )
}

export default LabOverviewTemplate