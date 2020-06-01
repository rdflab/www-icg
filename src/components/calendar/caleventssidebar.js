import React from "react"
import Collapsible from "../collapsible"
import { eventUrl } from "../../utils/urls"
import { formatDate, formatStartTime } from "./calevent"
import BlueLink from "../bluelink"

const SideBarCalEvent = ({ event }) => (
  <div className="mb-4">
    <h5>
      <BlueLink to={eventUrl(event)}>{event.frontmatter.title}</BlueLink>
    </h5>
    <div className="text-gray-500">
      <span>{event.frontmatter.date}</span>, {event.frontmatter.startTime}
    </div>
  </div>
)

const CalEventsSideBar = ({ events, maxRecords }) => {
  const ret = []

  const now = new Date()

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

    ret.push(<SideBarCalEvent key={i} event={event} />)

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
