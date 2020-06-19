import React from "react"
import Column from "../column"

import CalEventDate from "./caleventdate"
import CalEventDetails from "./caleventdetails"
import ShowSmall from "../showsmall"
import HideSmall from "../hidesmall"
import FullDiv from "../fulldiv"

export const formatDate = (event) => {
  return `${event.start.toLocaleString("default", {
    month: "long",
  })} ${event.start.toLocaleString("default", {
    day: "numeric",
  })}, ${event.start.toLocaleString("default", { year: "numeric" })}`
}

export const formatStartTime = (event) => {
  return event.start.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
}

export const formatTime = (event) => {
  const et = event.end.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  return `${formatStartTime(event)} - ${et}`
}

const CalEvent = ({ event, imageMap }) => {
  return (
    <div className="w-full border-b border-solid border-gray-300 mb-4 pb-4">
      <ShowSmall>
        <Column isMobile={true}>
          <Column isMobile={true} className="w-2/10">
            <CalEventDate event={event} />
          </Column>
        </Column>
        <CalEventDetails event={event} isMobile={true} imageMap={imageMap} />
      </ShowSmall>
      <HideSmall className="w-full">
        <Column>
          <Column className="w-1/10 mr-4">
            <CalEventDate event={event} />
          </Column>
          <Column className="w-9/10">
            <FullDiv>
              <CalEventDetails event={event} imageMap={imageMap} />
            </FullDiv>
          </Column>
        </Column>
      </HideSmall>
    </div>
  )
}

CalEvent.defaultProps = {
  imageMap: {},
}

export default CalEvent
