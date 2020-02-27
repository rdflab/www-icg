import React from "react"
import Layout from "../components/layout"
import NewsItemDate from "../components/news/newsitemdate"
import CalEventLocation from "../components/calendar/caleventlocation"

const CalEventTemplate = props => {
  const { pageContext } = props
  const { calEvent, allCalEvents } = pageContext

  const title = calEvent.frontmatter.title

  return (
    <Layout
      crumbs={[
        ["Home", "/"],
        ["News", "/news"],
      ]}
      title={title}
    >
      <div className="columns">
        <div className="column">
          <h4>{title}</h4>
          <NewsItemDate>{calEvent.start}</NewsItemDate>
          <div dangerouslySetInnerHTML={{ __html: calEvent.html }} />

          <CalEventLocation event={calEvent} />
        </div>
        <div className="column is-4"></div>
      </div>
    </Layout>
  )
}

export default CalEventTemplate
