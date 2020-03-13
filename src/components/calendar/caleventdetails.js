import React from "react"
import CalEventLocation from "./caleventlocation"
import BlueLink from "../bluelink"

const CalEventDetails = ({ event, isMobile }) => {
  const path = `/events/${
    event.frontmatter.start.split("T")[0]
  }-${event.frontmatter.title.toLowerCase().replace(" ", "-")}`

  return (
    <div>
      <h2>
        <BlueLink to={path}>{event.frontmatter.title}</BlueLink>
      </h2>
      <CalEventLocation event={event} isMobile={isMobile} />
    </div>
  )
}

export default CalEventDetails

CalEventDetails.defaultProps = {
  isMobile: false,
}
