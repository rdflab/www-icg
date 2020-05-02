import React from "react"
import Column from "../column"
import HideSmall from "../hidesmall"
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"
import { formatDate, formatTime } from "./calevent"

const CalEventLocation = ({ event, showDate, isMobile }) => {
  let date

  if (showDate) {
    date = formatDate(event)
  } else {
    date = ""
  }

  let time = formatTime(event)

  return (
    <>
      <HideSmall show={true} className="text-gray">
        <Column isVCentered={true} isMobile={true}>
          <div className="mr-4">
            <FaRegClock size={28} />
          </div>
          <div>
            {showDate && <div>{date}</div>}
            <div>{time}</div>
          </div>
        </Column>
        <Column isVCentered={true} className="mt-4" isMobile={true}>
          <div className="mr-4">
            <FaMapMarkerAlt size={28} />
          </div>
          <div>{event.frontmatter.location}</div>
        </Column>
      </HideSmall>

      <HideSmall>
        <Column className="text-gray items-center">
          <Column w="1">
            <FaRegClock size={28} />
          </Column>
          <Column w="5">
            <div>
              {showDate && <div>{date}</div>}
              <div>{time}</div>
            </div>
          </Column>
          <Column w="1">
            <FaMapMarkerAlt size={28} />
          </Column>
          <Column isMobile={true} w="5">
            {event.frontmatter.location}
          </Column>
        </Column>
      </HideSmall>
    </>
  )
}

export default CalEventLocation

CalEventLocation.defaultProps = {
  showDate: false,
  isMobile: false,
}
