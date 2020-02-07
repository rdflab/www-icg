import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Publications from "../components/publications"

const LabTemplate = props => {
  const { data, pageContext } = props

  const { labId, name, publications } = pageContext

  //const { markdownRemark } = data // data.markdownRemark holds your post data
  //const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title={`The ${name} Lab`} />

      <div className="blog-post-container">
        
        hello {labId}

        <Publications publications={publications}/>

        {/* <div className="blog-post">
          <h1>{frontmatter.title}</h1>
          <h2>{frontmatter.date}</h2>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div> */}
      </div>
    </Layout>
  )
}
// export const pageQuery = graphql`
//   query($path: String!) {
//     markdownRemark(frontmatter: { path: { eq: $path } }) {
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         path
//         title
//       }
//     }
//   }`

export default LabTemplate