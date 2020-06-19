import React from "react"
import Column from "../column"
import HideSmall from "../hidesmall"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ShowSmall from "../showsmall"
import ShowBetween from "../showbetween"

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
          <div className="text-center w-8 mr-2">
            <FontAwesomeIcon icon={["far", "clock"]} className={`text-2xl`} />
          </div>
          <div>
            {showDate && <div>{date}</div>}
            <div>
              {`${event.frontmatter.startTime} - ${event.frontmatter.endTime}`}
              {/* {`${event.frontmatter.startTime}`} */}
            </div>
          </div>
        </Column>
        <Column isVCentered={true} className="mt-2" isMobile={true}>
          <div className="text-center w-8 mr-2">
            <FontAwesomeIcon icon="map-marker-alt" className={`text-2xl`} />
          </div>
          <div>{event.frontmatter.location}</div>
        </Column>
      </ShowSmall>

      <ShowBetween
        s1="md"
        s2="2xl"
        className={` ${color === "white" ? "text-white" : "text-gray-500"}`}
      >
        <Column className="items-start">
          <Column className="w-full">
            <FontAwesomeIcon
              icon={["far", "clock"]}
              className={`text-2xl mr-2`}
            />
            <div>
              <ShowSmall size="lg">
                {`${event.frontmatter.startTime}`}
              </ShowSmall>
              <HideSmall size="lg">
                {`${event.frontmatter.startTime} - ${event.frontmatter.endTime}`}
              </HideSmall>
            </div>
          </Column>
        </Column>
      </ShowBetween>

      <HideSmall
        size="2xl"
        className={` ${color === "white" ? "text-white" : "text-gray-500"}`}
      >
        <Column className="items-start">
          <Column className="w-5/12 mr-8">
            <FontAwesomeIcon
              icon={["far", "clock"]}
              className={`text-2xl mr-2`}
            />
            <div>
              {showDate && <div>{date}</div>}
              {`${event.frontmatter.startTime} - ${event.frontmatter.endTime}`}
            </div>
          </Column>
          <Column className="w-7/12">
            <FontAwesomeIcon
              icon="map-marker-alt"
              className={`text-2xl mr-2`}
            />
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
