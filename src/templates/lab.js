import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

import RecentPublications from "../components/publication/recentpublications"
import toLabMap from "../utils/tolabmap"
import Card from "../components/card"
import EmailLink from "../components/emaillink"
import PhoneLink from "../components/phonelink"
import URILink from "../components/urilink"
import Columns from "../components/columns"
import Column from "../components/column"

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
      `${faculty.firstName} ${faculty.lastName}`,
      `/research-areas/labs/${lab.id}`,
    ],
  ]

  return (
    <Layout crumbs={crumbs} title={`The ${faculty.lastName} Lab`}>
      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <div dangerouslySetInnerHTML={{ __html: labExcerptHtml }} />
          <Link
            to={`/research-areas/labs/${lab.id}/overview`}
            className="btn btn-primary"
          >
            Learn more
          </Link>
        </div>
      </div>

      <Columns>
        <Column>
          <h2>{`${faculty.firstName} ${faculty.lastName}`}</h2>
          <h3>Research Focus</h3>
          <h3>Education</h3>
        </Column>
        <Column></Column>
        <Column>
          <EmailLink to={faculty.email} />
          <PhoneLink phoneNumbers={faculty.phoneNumbers} />

          {lab.uri !== "" && <URILink to={lab.uri} />}
        </Column>
      </Columns>

      <Columns>
        <Column w={8}>
          <Card>
            <RecentPublications
              lab={lab}
              publications={labPublications}
              labMap={labMap}
              peopleMap={peopleMap}
            />
          </Card>
        </Column>
      </Columns>
    </Layout>
  )
}

export default LabTemplate
