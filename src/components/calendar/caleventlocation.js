import React from "react"
import Column from "../column"
import HideSmall from "../hidesmall"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const CalEventLocation = ({ event, showDate, isMobile, color }) => {
  let date

  if (showDate) {
    date = event.frontmatter.date
  } else {
    date = ""
  }

  //let time = formatTime(event)

  return (
    <>
      <HideSmall
        show={true}
        className={`${color === "white" ? "text-white" : "text-gray-500"}`}
      >
        <Column isVCentered={true} isMobile={true}>
          <div className="w-1/10 text-center">
            <FontAwesomeIcon icon={["far", "clock"]} className={`text-3xl`} />
          </div>
          <div className="w-9/10">
            {showDate && <div>{date}</div>}
            <div>
              {event.frontmatter.startTime} - {event.frontmatter.endTime}
            </div>
          </div>
        </Column>
        <Column isVCentered={true} className="mt-4" isMobile={true}>
          <div className="w-1/10 text-center">
            <FontAwesomeIcon icon="map-marker-alt" className={`text-3xl`} />
          </div>
          <div className="w-9/10">{event.frontmatter.location}</div>
        </Column>
      </HideSmall>

      <HideSmall
        className={`${color === "white" ? "text-white" : "text-gray-500"}`}
      >
        <Column className="items-center">
          <Column w="1">
            <FontAwesomeIcon icon={["far", "clock"]} className={`text-3xl`} />
          </Column>
          <Column w="5">
            <div>
              {showDate && <div>{date}</div>}
              <div>
                {event.frontmatter.startTime} - {event.frontmatter.endTime}
              </div>
            </div>
          </Column>
          <Column w="1">
            <FontAwesomeIcon icon="map-marker-alt" className={`text-3xl`} />
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
  color: "blue",
}
