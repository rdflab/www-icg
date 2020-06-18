import React from "react"
import Column from "../column"
import HideSmall from "../hidesmall"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ShowSmall from "../showsmall"

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
      <ShowSmall
        className={`${color === "white" ? "text-white" : "text-gray-500"}`}
      >
        <Column isVCentered={true} isMobile={true}>
          <div className="w-1/10 mr-2">
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
          <div className="w-1/10 mr-2">
            <FontAwesomeIcon icon="map-marker-alt" className={`text-3xl`} />
          </div>
          <div className="w-9/10">{event.frontmatter.location}</div>
        </Column>
      </ShowSmall>

      <HideSmall
        className={`${color === "white" ? "text-white" : "text-gray-500"}`}
      >
        <Column className="items-center">
          <Column className="w-1/10 text-center mr-2">
            <FontAwesomeIcon icon={["far", "clock"]} className={`text-3xl`} />
          </Column>
          <Column className="w-9/10">
            <div>
              {showDate && <div>{date}</div>}
              <div>
                {event.frontmatter.startTime} - {event.frontmatter.endTime}
              </div>
            </div>
          </Column>
          <Column className="w-1/10 mr-2">
            <FontAwesomeIcon icon="map-marker-alt" className={`text-3xl`} />
          </Column>
          <Column isMobile={true} className="w-9/10">
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
