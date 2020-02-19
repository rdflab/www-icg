import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { MdEmail } from 'react-icons/md';
import TopPublications from "../components/toppublications"
import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"
import Breadcrumb from "../components/breadcrumb"
import Card from "../components/card";

const LabTemplate = props => {
  const { data, pageContext } = props
  const { lab, allPeople, allPublications } = pageContext
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, excerpt, html } = markdownRemark
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

      <Breadcrumb crumbs={ [ ['For Research Scientists','/research-areas'], ['Labs', '/research-areas/labs'], [`${faculty.firstName} ${faculty.lastName}`, `/research-areas/labs/${lab.id}`] ] } />

      <div className="columns">
        <div className="column">
        </div>
        <div className="column">
          <div dangerouslySetInnerHTML={{ __html: excerpt }} />
          <Link to={'./overview'} className="btn btn-primary">Learn more</Link>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <h2>{`${faculty.firstName} ${faculty.lastName}`}</h2>
          <h3>Research Focus</h3>
          <h3>Education</h3>
        </div>
        <div className="column">
        </div>
        <div className="column">
          <div className="columns">
            <div className="column">
              <MdEmail size="2rem" />
            </div>
            <div className="column">
              <h4>Email Address</h4>
              <a href={`mailto:${faculty.email}`}>{faculty.email}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-two-thirds">
          <Card>
            <TopPublications lab={lab} publications={publications} labMap={labMap} />
          </Card>
        </div>
      </div>

    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    publications: allPublicationsJson(sort: {fields: [year, title], order: [DESC, ASC]}) {
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

    markdownRemark(frontmatter: { path: { eq: $path } }) {
      excerpt(format: HTML)
      html
      frontmatter {
        path
      }
    }
  }
`

export default LabTemplate