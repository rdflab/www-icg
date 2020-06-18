import React from "react"
import getEventType from "./caleventype"
import HideSmall from "../hidesmall"
import ShowSmall from "../showsmall"

const CalEventDate = ({ event, color, smallFormat }) => {
  const eventType = getEventType(event)

  let textColor
  let dayColor
  let dayBgColor

  switch (color) {
    case "white":
      textColor = "text-white"
      dayBgColor = "bg-transparent"
      break
    default:
      dayColor = "text-white"
      switch (eventType) {
        case "Public Talk":
          textColor = "text-red-500"
          dayBgColor = "bg-red-500"
          break
        default:
          textColor = "text-columbia-secondary-blue"
          dayBgColor = "bg-columbia-secondary-blue"
          break
      }
  }

  return (
    <>
      <ShowSmall className={`mb-2 w-full ${textColor}`}>
        {smallFormat && (
          <div className="uppercase w-full">
            {`${event.frontmatter.weekday}, ${event.frontmatter.month} ${event.frontmatter.day}`}
          </div>
        )}
        {!smallFormat && (
          <>
            <div className="uppercase text-sm text-center w-full">
              {event.frontmatter.month}
            </div>
            <div className="uppercase font-light text-center text-3xl w-full">
              {event.frontmatter.day}
            </div>
            <div
              className={`uppercase text-sm px-2 text-center w-full ${dayColor} ${dayBgColor}`}
            >
              {event.frontmatter.weekday}
            </div>
          </>
        )}
      </ShowSmall>
      <HideSmall className={`text-center mb-4 w-full ${textColor}`}>
        <div className="uppercase text-sm text-center w-full">
          {event.frontmatter.month}
        </div>
        <div className="uppercase font-light text-center text-3xl w-full">
          {event.frontmatter.day}
        </div>
        <div
          className={`uppercase text-sm px-2 text-center w-full ${dayColor} ${dayBgColor}`}
        >
          {event.frontmatter.weekday}
        </div>
      </HideSmall>
    </>
  )
}

CalEventDate.defaultProps = {
  color: "blue",
  smallFormat: false,
}

export default CalEventDate
