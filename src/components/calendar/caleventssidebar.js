import React from "react"
import Collapsible from "../collapsible"
import { eventUrl } from "../../utils/urls"
import { formatDate, formatStartTime } from "./calevent"
import BlueLink from "../bluelink"

const CalEventSideBar = ({ event }) => (
  <div className="mb-4">
    <BlueLink to={eventUrl(event)}>{event.frontmatter.title}</BlueLink>
    <div className="gray">
      {formatDate(event)}, {formatStartTime(event)}
    </div>
  </div>
)

const CalEventsSideBar = ({ events, maxRecords }) => {
  const ret = []

  const now = Date.now()

  let c = 0

  for (let i = 0; i < events.length; ++i) {
    const event = events[i]

    if (event.start === undefined) {
      event.start = new Date(event.frontmatter.start)
      event.end = new Date(event.frontmatter.end)
    }

    if (event.start < now) {
      continue
    }

    ret.push(<CalEventSideBar key={i} event={event} />)

    ++c

    if (c === maxRecords) {
      break
    }
  }

  return (
    <Collapsible title="Upcoming Events" height="auto">
      {/* <div className="bottom-spacing-1">
      <SideBarLink
        to={`/research-areas/labs/${group.frontmatter.id}/members`}
        style={{ marginBottom: "1rem" }}
      >
        Overview
      </SideBarLink>
    </div> */}

      {ret}
    </Collapsible>
  )
}

CalEventsSideBar.defaultProps = {
  maxRecords: 5,
}

export default CalEventsSideBar
