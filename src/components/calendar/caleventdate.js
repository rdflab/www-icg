import React from "react"
import getEventType from "./caleventype"

const CalEventDate = ({ event, color }) => {
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
    <div className={`text-center mb-4 w-full ${textColor}`}>
      <div className="uppercase text-sm">{event.frontmatter.month}</div>
      <div className="uppercase font-light text-3xl">
        {event.frontmatter.day}
      </div>
      <div className={`uppercase text-sm px-2 ${dayColor} ${dayBgColor}`}>
        {event.frontmatter.weekday}
      </div>
    </div>
  )
}

CalEventDate.defaultProps = {
  color: "blue",
}

export default CalEventDate
