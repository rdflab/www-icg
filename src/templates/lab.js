import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PublicationList from "../components/publicationlist"

import { MdEmail } from 'react-icons/md';
import TopPublications from "../components/toppublications"
 

const LabTemplate = props => {
  const { data, pageContext } = props
  const { member } = pageContext
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, excerpt, html } = markdownRemark
  const allPublications = data.allPublications.edges

  var publications = []

  allPublications.forEach(({ node }) => {
    publications.push(node)
  })

  return (
    <Layout>
      <SEO title={`The ${member.lastName} Lab`} />

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
          <h2>{`${member.firstName} ${member.lastName}`}</h2>
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
              <a href={`mailto:${member.email}`}>{member.email}</a>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column is-two-thirds">
          <TopPublications publications={publications} />
        </div>
      </div>

    </Layout>
  )
}

export const pageQuery = graphql`
  query($labId: String!, $path: String!) {
    allPublications: allPublicationsJson(sort: {fields: [year, title], order: [DESC, ASC]}, filter: {labId: {eq: $labId}}) {
      edges {
        node {
          authors {
            corresponding
            initials
            lastName
          }
          labId
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