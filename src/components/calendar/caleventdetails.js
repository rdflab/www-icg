import React from "react"
import CalEventLocation from "./caleventlocation"
import BlueLink from "../links/bluelink"
import WhiteLink from "../links/whitelink"
import TextLink from "../links/textlink"
import { eventUrl } from "../../utils/urls"

import HTMLDiv from "../htmldiv"
import useSiteMetadata from "../../hooks/sitemetadata"
import getEventType from "./caleventype"
import getEventTypeUrl from "./caleventtypeurl"
import RedLink from "../links/redlink"
import FullDiv from "../fulldiv"

const CalEventDetails = ({ event, isMobile, color }) => {
  const { paths } = useSiteMetadata()

  const eventType = getEventType(event)

  let eventTypeLink

  switch (color) {
    case "white":
      eventTypeLink = (
        <WhiteLink to={getEventTypeUrl(paths.eventsPath, eventType)}>
          {eventType}
        </WhiteLink>
      )
      break
    default:
      switch (eventType) {
        case "Public Talk":
          eventTypeLink = (
            <RedLink to={getEventTypeUrl(paths.eventsPath, eventType)}>
              {eventType}
            </RedLink>
          )
          break
        default:
          eventTypeLink = (
            <BlueLink to={getEventTypeUrl(paths.eventsPath, eventType)}>
              {eventType}
            </BlueLink>
          )
          break
      }

      break
  }

  return (
    <FullDiv>
      <div className="uppercase">{eventTypeLink}</div>
      <h3>
        {color === "white" && (
          <WhiteLink to={eventUrl(event)}>{event.frontmatter.title}</WhiteLink>
        )}
        {color === "blue" && (
          <BlueLink to={eventUrl(event)}>{event.frontmatter.title}</BlueLink>
        )}
        {color === "black" && (
          <TextLink to={eventUrl(event)}>{event.frontmatter.title}</TextLink>
        )}
      </h3>
      <h5
        className={`mb-4 ${
          color === "white" ? "text-white" : "text-columbia-dark-gray"
        }`}
      >
        <HTMLDiv html={event.excerpt} />
      </h5>
      <CalEventLocation event={event} isMobile={isMobile} color={color} />
    </FullDiv>
  )
}

export default CalEventDetails

CalEventDetails.defaultProps = {
  isMobile: false,
  color: "black",
}
