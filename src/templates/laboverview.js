import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import RecentPublications from "../components/recentpublications"
import toLabMap from "../utils/tolabmap"
import Columns from "../components/columns"
import Column from "../components/column"
import SideBar from "../components/sidebar"
import SideBarMembers from "../components/sidebarmembers"

const LabOverviewTemplate = props => {
  const { pageContext } = props
  const { lab, labPeople, peopleMap, labPublications, labHtml } = pageContext

  const labs = [lab] //toLabs([lab], peopleMap)
  const labMap = toLabMap(labs)

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
