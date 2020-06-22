import React, { useState } from "react"
import Column from "../column"

import CalEventDate from "./caleventdate"
import CalEventDetails from "./caleventdetails"
import ShowSmall from "../showsmall"
import HideSmall from "../hidesmall"
import FullDiv from "../fulldiv"
import Card from "../card"

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

const CalEvent = ({ event, smallFormat, imageMap }) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = (e) => {
    setHover(true)
  }

  const onMouseLeave = (e) => {
    setHover(false)
  }

  return (
    <Card
      className="mb-6"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ShowSmall>
        <Column isMobile={true}>
          <Column isMobile={true} className="w-3/20 ml-4 mt-4">
            <CalEventDate event={event} smallFormat={smallFormat} />
          </Column>
        </Column>
        <CalEventDetails event={event} isMobile={true} imageMap={imageMap} />
      </ShowSmall>
      <HideSmall className="w-full">
        <Column>
          <Column className="w-1/10 m-4 mr-4">
            <CalEventDate event={event} />
          </Column>
          <Column className="w-9/10">
            <FullDiv>
              <CalEventDetails
                event={event}
                imageMap={imageMap}
                hover={hover}
              />
            </FullDiv>
          </Column>
        </Column>
      </HideSmall>
    </Card>
  )
}

CalEvent.defaultProps = {
  smallFormat: false,
  imageMap: {},
}

export default CalEvent
