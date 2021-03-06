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
import Column from "../column"
import Img from "gatsby-image"
import FullDiv from "../fulldiv"
import GrayLinkExt from "../links/graylinkext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HideSmall from "../hidesmall"
import ZoomImage from "../images/zoomimage"

export const EventImage = ({ name, imageMap, hover }) => (
  <div className="w-48 h-48">
    {name !== null && name in imageMap && (
      <ZoomImage
        fluid={imageMap[name].childImageSharp.fluid}
        className="w-full h-full"
        extZoom={hover}
      />
    )}
  </div>
)

EventImage.defaultProps = {
  hover: false,
}

const CalEventDetails = ({ event, isMobile, color, imageMap, hover }) => {
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

  if (color !== "white") {
    if (event.frontmatter.tags.includes("color::red")) {
      eventTypeLink = (
        <RedLink to={getEventTypeUrl(paths.eventsPath, eventType)}>
          {eventType}
        </RedLink>
      )
    }
  }

  // See if we should include an image
  let imageName = null

  for (let tag of event.frontmatter.tags) {
    if (tag.startsWith("image::")) {
      const tokens = tag.split("::")
      imageName = tokens[1]
    }
  }

  return (
    <Column className="justify-between">
      <FullDiv className="m-4">
        <div className="mb-2">
          <div className="uppercase">{eventTypeLink}</div>
          <h3>
            {color === "white" && (
              <WhiteLink to={eventUrl(event)}>
                {event.frontmatter.title}
              </WhiteLink>
            )}
            {color === "blue" && (
              <BlueLink to={eventUrl(event)}>
                {event.frontmatter.title}
              </BlueLink>
            )}
            {color === "black" && (
              <TextLink to={eventUrl(event)}>
                {event.frontmatter.title}
              </TextLink>
            )}
          </h3>
          <h5
            className={`${
              color === "white" ? "text-white" : "text-columbia-dark-gray"
            }`}
          >
            <HTMLDiv html={event.excerpt} />
          </h5>
        </div>

        <CalEventLocation event={event} isMobile={isMobile} color={color} />

        <div className="text-sm mt-2">
          {/* <FontAwesomeIcon icon={["far", "calendar"]} className={`text-xl text-gray-500 mr-2`} /> */}
          <GrayLinkExt to={event.icsFile}>Add To Calendar</GrayLinkExt>
        </div>
      </FullDiv>
      <HideSmall
        size="lg"
        className="pt-2 md:pt-0 min-w-48 min-h-48 overflow-hidden"
      >
        <EventImage name={imageName} imageMap={imageMap} hover={hover} />
      </HideSmall>
    </Column>
  )
}

export default CalEventDetails

CalEventDetails.defaultProps = {
  isMobile: false,
  color: "black",
  imageMap: {},
  hover: false,
}
