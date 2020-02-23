import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NewsSideBar from "../components/newssidebar"
import NewsItemDate from "../components/newsitemdate"

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
          <h4>{title}</h4>
          <NewsItemDate>{item.frontmatter.date}</NewsItemDate>
          <div dangerouslySetInnerHTML={{ __html: item.html }} />
        </div>
        <div className="column is-4">
          <NewsSideBar allNews={allNews} />
        </div>
      </div>
    </Layout>
  )
}

export default NewsItemTemplate
