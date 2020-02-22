import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NewsItemTemplate = props => {
  const { pageContext } = props
  const { item } = pageContext
 
  const title = item.frontmatter.title

  return (
    <Layout crumbs={[
      ["Home", "/"],
      ["News", "/news"],
      [title, item.frontmatter.path],
    ]}>
      <SEO title={title} />

      <h1>{title}</h1>
    </Layout>
  )
}

export default NewsItemTemplate
