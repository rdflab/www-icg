import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import flattenEdges from "../utils/flattenedges"
import toPeopleMap from "../utils/topeoplemap"
import toLabs from "../utils/tolabs"
import toLabMap from "../utils/tolabmap"
import PubSearch from "../components/pubsearch"

const News = props => {
  const { data } = props
  const news = flattenEdges(data.news.edges) //sort(flatten(data.publications.edges))

  return (
    <Layout crumbs={[["News", "/news"]]}>
      <SEO title="News" />

      <h1>News</h1>

      {news.map((item, index) => (
        <article>
        <h2>{item.frontmatter.title}</h2>
        <div>{item.frontmatter.date}</div>
        </article>
      ))}
    </Layout>
  )
}

export default News

export const pageQuery = graphql`
  query {
    news: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {path: {regex: "/news/"}}}) {
      edges {
        node {
          frontmatter {
            path
            title
            date(formatString: "MMMM DD, YYYY")
          }
          excerpt(format: HTML)
          html
        }
      }
    }
  }
`
