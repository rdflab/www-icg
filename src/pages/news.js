import React from "react"
import { graphql } from "gatsby"
import CrumbLayout from "../components/crumblayout"
import flattenEdges from "../utils/flattenedges"
import NewsSearch from "../components/news/newssearch"

const News = props => {
  const { data } = props
  const allNews = flattenEdges(data.news.edges) //sort(flatten(data.publications.edges))

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

export default News

export const pageQuery = graphql`
  query {
    news: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { regex: "/News/" } } }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            date(formatString: "MMMM DD, YYYY")
            year: date(formatString: "YYYY")
            month: date(formatString: "MMMM")
            tags
          }
          excerpt(format: HTML)
          html
        }
      }
    }
  }
`
