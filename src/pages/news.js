import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import flattenEdges from "../utils/flattenedges"
import NewsSearch from "../components/newssearch"
import Title from "../components/title"

const News = props => {
  const { data } = props
  const allNews = flattenEdges(data.news.edges) //sort(flatten(data.publications.edges))

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["News", "/news"],
      ]}
    >
      <SEO title="News" />

      <Title>News</Title>

      <NewsSearch allNews={allNews} />
    </Layout>
  )
}

export default News

export const pageQuery = graphql`
  query {
    news: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { path: { regex: "/news/" } } }
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
