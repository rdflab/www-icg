import React from "react"
import Layout from "../components/layout"
import NewsItemDate from "../components/news/newsitemdate"
import CalEventLocation from "../components/calendar/caleventlocation"
import H4 from "../components/headings/h4"
import styled from "styled-components"

const LocDiv = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: solid 1px lightgray;
  border-bottom: solid 1px lightgray;
`

const CalEventTemplate = props => {
  const { pageContext } = props
  const { calEvent, allCalEvents } = pageContext

  const title = calEvent.frontmatter.title

  calEvent.start = new Date(calEvent.frontmatter.start)
  calEvent.end = new Date(calEvent.frontmatter.end)

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["Events", "/events"],
      ]}
      title="Events"
    >
      <div className="columns">
        <div className="column">
          <H4>{title}</H4>
          <div dangerouslySetInnerHTML={{ __html: calEvent.html }} />

          <LocDiv>
            <CalEventLocation event={calEvent} showDate={true} />
          </LocDiv>
        </div>
        <div className="column is-4"></div>
      </div>
    </Layout>
  )
}

export default CalEventTemplate
