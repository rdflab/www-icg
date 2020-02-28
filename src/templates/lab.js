import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

import RecentPublications from "../components/publication/recentpublications"
import toLabMap from "../utils/tolabmap"
import EmailLink from "../components/emaillink"
import PhoneLink from "../components/phonelink"
import URLLink from "../components/urllink"
import Columns from "../components/columns"
import Column from "../components/column"
import Button from "../components/button"
import SideBar from "../components/sidebar/sidebar"

const LabTemplate = props => {
  const { pageContext } = props
  const {
    lab,
    peopleMap,
    labPublications,
    labExcerptHtml,
    labHtml,
  } = pageContext

  const labs = [lab] //toLabs([lab], peopleMap)
  const labMap = toLabMap(labs)

  const faculty = peopleMap[lab.leaders[0]]

  const crumbs = [
    ["Home", "/"],
    ["Research Areas", "/research-areas"],
    ["Labs", "/research-areas/labs"],
    [
      `${faculty.frontmatter.firstName} ${faculty.frontmatter.lastName}`,
      `/research-areas/labs/${lab.id}`,
    ],
  ]

  return (
    <Layout crumbs={crumbs} title={`The ${faculty.frontmatter.lastName} Lab`}>
      <Columns>
        <Column className="is-hidden-tablet">
          <SideBar>
            {faculty.frontmatter.email.length > 0 && (
              <EmailLink to={faculty.frontmatter.email} />
            )}
            {faculty.frontmatter.phone.length > 0 && (
              <PhoneLink numbers={faculty.frontmatter.phone} />
            )}
            {lab.urls.length > 0 && <URLLink urls={lab.urls} />}
          </SideBar>
        </Column>
        <Column w={8}>
          <div dangerouslySetInnerHTML={{ __html: labExcerptHtml }} />

          <div className="has-text-centered">
            <Button to={`/research-areas/labs/${lab.id}/overview`}>
              Learn more
            </Button>
          </div>

          <h2>{`${faculty.firstName} ${faculty.lastName}`}</h2>
          <h3>Research Focus</h3>
          <h3>Education</h3>
          <RecentPublications
            lab={lab}
            publications={labPublications}
            labMap={labMap}
            peopleMap={peopleMap}
          />
        </Column>
        <Column className="is-hidden-mobile">
          <SideBar>
            {faculty.frontmatter.email.length > 0 && (
              <EmailLink to={faculty.frontmatter.email} />
            )}
            {faculty.frontmatter.phone.length > 0 && (
              <PhoneLink numbers={faculty.frontmatter.phone} />
            )}
            {lab.urls.length > 0 && <URLLink urls={lab.urls} />}
          </SideBar>
        </Column>
      </Columns>
    </Layout>
  )
}

export default LabTemplate
