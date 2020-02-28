import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import "../components/calendar/calendar.scss"
import flattenEdges from "../utils/flattenedges"
import CalSearch from "../components/calendar/calsearch"

const Events = props => {
  const { data } = props
  const allCalEvents = flattenEdges(data.events.edges)

  for (let calEvent of allCalEvents) {
    calEvent.start = new Date(calEvent.frontmatter.start)
    calEvent.end = new Date(calEvent.frontmatter.end)
  }

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Events", "/events"],
      ]}
      title="Events"
    >
      <CalSearch allCalEvents={allCalEvents} />
    </Layout>
  )
}

export default Events

export const pageQuery = graphql`
  query {
    events: allMarkdownRemark(
      sort: { fields: frontmatter___start, order: ASC }
      filter: { frontmatter: { tags: { regex: "/Event/" } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            location
            start
            end
            url
            tags
          }
          excerpt(format: HTML)
        }
      }
    }
  }
`
