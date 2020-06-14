import React from "react"
import CalEventLocation from "./caleventlocation"
import BlueLink from "../links/bluelink"
import { eventUrl } from "../../utils/urls"
import WhiteLink from "../links/whitelink"
import HTMLDiv from "../htmldiv"

const CalEventDetails = ({ event, isMobile, color }) => (
  <div>
    <h3 className="mb-2">
      {color === "white" && (
        <WhiteLink to={eventUrl(event)}>{event.frontmatter.title}</WhiteLink>
      )}
      {color === "blue" && (
        <BlueLink to={eventUrl(event)}>{event.frontmatter.title}</BlueLink>
      )}
    </h3>
    <h5 className="mb-2">
      <HTMLDiv html={event.excerpt} />
    </h5>
    <CalEventLocation event={event} isMobile={isMobile} color={color} />
  </div>
)

export default CalEventDetails

CalEventDetails.defaultProps = {
  isMobile: false,
  color: "blue",
}
