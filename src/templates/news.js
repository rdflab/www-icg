import React from "react"
import CrumbLayout from "../components/crumblayout"
import NewsSearch from "../components/news/newssearch"

const NewsTemplate = props => {
  const { pageContext } = props
  const { allNews } = pageContext

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["News", "/news"],
      ]}
      title="News"
    >
      <NewsSearch allNews={allNews} />
    </CrumbLayout>
  )
}

export default NewsTemplate
