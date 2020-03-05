import React from "react"
import CrumbLayout from "../components/crumblayout"
import CalSearch from "../components/calendar/calsearch"

const CalEventsTemplate = props => {
  const { pageContext } = props
  const { allCalEvents } = pageContext

  for (let calEvent of allCalEvents) {
    calEvent.start = new Date(calEvent.frontmatter.start)
    calEvent.end = new Date(calEvent.frontmatter.end)
  }

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Events", "/events"],
      ]}
      title="Events"
    >
      <CalSearch allCalEvents={allCalEvents} />
    </CrumbLayout>
  )
}

export default CalEventsTemplate
