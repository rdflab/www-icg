import React from "react"
import Column from "../column"

import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"

const CalEventLocation = ({ event, showDate, isMobile }) => {
  const st = event.start.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  const et = event.end.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  let date

  if (showDate) {
    date = `${event.start.toLocaleString("default", {
      month: "long",
    })} ${event.start.toLocaleString("default", {
      day: "numeric",
    })}, ${event.start.toLocaleString("default", { year: "numeric" })}`
  } else {
    date = ""
  }

  return (
    <>
      <div className="md:hidden gray">
        <Column isVCentered={true} isMobile={true}>
          <div className="mr-4">
            <FaRegClock size={28} />
          </div>
          <div>
            {showDate && <div>{date}</div>}
            <div>
              {st} - {et}
            </div>
          </div>
        </Column>
        <Column isVCentered={true} className="mt-4" isMobile={true}>
          <div className="mr-4">
            <FaMapMarkerAlt size={28} />
          </div>
          <div>{event.frontmatter.location}</div>
        </Column>
      </div>

      <div className="hidden md:block">
        <Column className="gray items-center">
          <Column w="1">
            <FaRegClock size={28} />
          </Column>
          <Column w="5">
            {showDate && <div>{date}</div>}
            <div>
              {st} - {et}
            </div>
          </Column>
          <Column w="1">
            <FaMapMarkerAlt size={28} />
          </Column>
          <Column isMobile={true} w="5">
            {event.frontmatter.location}
          </Column>
        </Column>
      </div>
    </>
  )
}

export default CalEventLocation

CalEventLocation.defaultProps = {
  showDate: false,
  isMobile: false,
}
