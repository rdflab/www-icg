import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { MdEmail } from "react-icons/md"
import RecentPublications from "../components/recentpublications"
import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"
import Breadcrumb from "../components/breadcrumb"
import Card from "../components/card"
import EmailLink from "../components/emaillink"
import PhoneLink from "../components/phonelink"
import URILink from "../components/urilink"

const LabTemplate = props => {
  const { data, pageContext } = props
  const {
    lab,
    allPeople,
    allPublications,
    labExcerptHtml,
    labHtml,
  } = pageContext

  const peopleMap = toPeopleMap(allPeople)

  const labs = toLabs([lab], peopleMap)
  const labMap = toLabMap(labs)

  console.log(labMap)

  const faculty = peopleMap.get(lab.faculty)

  const publications = []

  allPublications.forEach(publication => {
    if (publication.labs.includes(lab.id)) {
      publications.push(publication)
    }
  })

  return (
    <Layout>
      <SEO title={`The ${faculty.lastName} Lab`} />

      <Breadcrumb
        crumbs={[
          ["For Research Scientists", "/research-areas"],
          ["Labs", "/research-areas/labs"],
          [
            `${faculty.firstName} ${faculty.lastName}`,
            `/research-areas/labs/${lab.id}`,
          ],
        ]}
      />

      <div className="columns">
        <div className="column"></div>
        <div className="column">
          <div dangerouslySetInnerHTML={{ __html: labExcerptHtml }} />
          <Link to={"./overview"} className="btn btn-primary">
            Learn more
          </Link>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <h2>{`${faculty.firstName} ${faculty.lastName}`}</h2>
          <h3>Research Focus</h3>
          <h3>Education</h3>
        </div>
        <div className="column"></div>
        <div className="column">
          <EmailLink to={faculty.email} />
          <PhoneLink phoneNumbers={faculty.phoneNumbers} />

          {lab.uri !== "" && <URILink to={lab.uri} />}
        </div>
      </div>

      <div className="columns">
        <div className="column is-two-thirds">
          <Card>
            <RecentPublications
              lab={lab}
              publications={publications}
              labMap={labMap}
            />
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    publications: allPublicationsJson(
      sort: { fields: [year, title], order: [DESC, ASC] }
    ) {
      edges {
        node {
          authors {
            corresponding
            initials
            lastName
          }
          labs
          journal
          issue
          pages
          title
          volume
          year
        }
      }
    }
  }
`

export default LabTemplate
