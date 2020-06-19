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
        className={`w-full ${
          color === "white" ? "text-white" : "text-gray-500"
        }`}
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
        className={`w-full ${
          color === "white" ? "text-white" : "text-gray-500"
        }`}
      >
        <Column className="items-center">
          <Column className="w-4/12 mr-8">
            <div className="mr-4">
              <FontAwesomeIcon icon={["far", "clock"]} className={`text-3xl`} />
            </div>
            <div>
              {showDate && <div>{date}</div>}
              <div>
                {event.frontmatter.startTime} - {event.frontmatter.endTime}
              </div>
            </div>
          </Column>
          <Column className="w-8/12">
            <div className="mr-4">
              <FontAwesomeIcon icon="map-marker-alt" className={`text-3xl`} />
            </div>
            <div>{event.frontmatter.location}</div>
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
