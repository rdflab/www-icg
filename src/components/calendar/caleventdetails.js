import React from "react"
import CalEventLocation from "./caleventlocation"
import BlueLink from "../bluelink"
import { eventUrl } from "../../utils/urls"

const CalEventDetails = ({ event, isMobile }) => (
  <div>
    <h2>
      <BlueLink to={eventUrl(event)}>{event.frontmatter.title}</BlueLink>
    </h2>
    <CalEventLocation event={event} isMobile={isMobile} />
  </div>
)

export default CalEventDetails

CalEventDetails.defaultProps = {
  isMobile: false,
}
