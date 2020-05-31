import React from "react"
import CalEventLocation from "./caleventlocation"
import BlueLink from "../bluelink"
import { eventUrl } from "../../utils/urls"
import WhiteLink from "../whitelink"

const CalEventDetails = ({ event, isMobile, color }) => (
  <div>
    <h3>
      {color === "white" && (
        <WhiteLink to={eventUrl(event)}>{event.frontmatter.title}</WhiteLink>
      )}
      {color === "blue" && (
        <BlueLink to={eventUrl(event)}>{event.frontmatter.title}</BlueLink>
      )}
    </h3>
    <CalEventLocation event={event} isMobile={isMobile} color={color} />
  </div>
)

export default CalEventDetails

CalEventDetails.defaultProps = {
  isMobile: false,
  color: "blue",
}
