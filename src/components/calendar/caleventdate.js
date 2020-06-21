import React from "react"
import getEventType from "./caleventype"
import HideSmall from "../hidesmall"
import ShowSmall from "../showsmall"

const Day = ({ event, dayColor, dayBgColor }) => (
  // <div className="shadow">
  <div>
    <div
      className={`uppercase text-sm text-center w-full p-1 ${dayColor} ${dayBgColor}`}
    >
      {event.frontmatter.month}
    </div>
    <div className="uppercase font-light text-center text-2xl w-full">
      {event.frontmatter.day}
    </div>
    <div className={`uppercase text-sm pb-2 text-center w-full`}>
      {event.frontmatter.weekday}
    </div>
  </div>
)

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

  if (color !== "white") {
    if (event.frontmatter.tags.includes("color::red")) {
      textColor = "text-red-500"
      dayBgColor = "bg-red-500"
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
          <Day event={event} dayColor={dayColor} dayBgColor={dayBgColor} />
        )}
      </ShowSmall>
      <HideSmall className={`text-center mb-4 w-full`}>
        <Day event={event} dayColor={dayColor} dayBgColor={dayBgColor} />
      </HideSmall>
    </>
  )
}

CalEventDate.defaultProps = {
  color: "blue",
  smallFormat: false,
}

export default CalEventDate
