import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Publications from "../components/publications"

const LabTemplate = props => {
  const { data, pageContext } = props

  const { member } = pageContext

  const allPublications = data.allPublications.edges

  var publications = []

  allPublications.forEach(({ node }) => {
    publications.push(node)
  })

  //const { markdownRemark } = data // data.markdownRemark holds your post data
  //const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={`The ${member.lastName} Lab`} />

      <div className="blog-post-container">
        

        <Publications publications={publications}/>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($labId: String!) {
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
  }
`

export default LabTemplate