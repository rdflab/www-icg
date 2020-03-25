import React from "react"
import Column from "../column"

import CalEventDate from "./caleventdate"
import CalEventDetails from "./caleventdetails"

export const formatDate = event => {
  return `${event.start.toLocaleString("default", {
    month: "long",
  })} ${event.start.toLocaleString("default", {
    day: "numeric",
  })}, ${event.start.toLocaleString("default", { year: "numeric" })}`
}

export const formatStartTime = event => {
  return event.start.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
}

export const formatTime = event => {
  const et = event.end.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  return `${formatStartTime(event)} - ${et}`
}

const CalEvent = ({ event }) => {
  return (
    <div className="w-full border-b border-solid border-gray-300 mb-4 pb-4">
      <div className="md:hidden">
        <Column isMobile={true}>
          <Column w="3" isMobile={true}>
            <CalEventDate event={event} />
          </Column>
        </Column>
        <CalEventDetails event={event} isMobile={true} />
      </div>
      <div className="hidden md:block">
        <Column>
          <Column w="2" className="mr-2">
            <CalEventDate event={event} />
          </Column>
          <Column w="10">
            <CalEventDetails event={event} />
          </Column>
        </Column>
      </div>
    </div>
  )
}

export default CalEvent
