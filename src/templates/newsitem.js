import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsSideBar from "../components/newssidebar"

const NewsItemTemplate = props => {
  const { pageContext } = props
  const { item, allNews } = pageContext

  const title = item.frontmatter.title

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["News", "/news"],
        [title, item.frontmatter.path],
      ]}
    >
      <SEO title={title} />

      <div className="columns">
        <div className="column">
          <h1>{title}</h1>
        </div>
        <div className="column is-4">
          <NewsSideBar allNews={allNews} />
        </div>
      </div>
    </Layout>
  )
}

export default NewsItemTemplate
