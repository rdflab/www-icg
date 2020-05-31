import React from "react"

const CalEventDate = ({ event, color }) => {
  return (
    <div
      className={`text-center mb-4 w-full ${
        color === "white" ? "text-white" : "text-columbia-secondary-blue"
      }`}
    >
      <div className="uppercase text-sm">
        {event.start.toLocaleString("default", { month: "short" })}
      </div>
      <div className="uppercase font-light text-3xl">
        {event.start.toLocaleString("default", { day: "numeric" })}
      </div>
      <div
        className={`uppercase text-sm text-white px-2 ${
          color === "white"
            ? "text-columbia-secondary-blue bg-white"
            : "bg-columbia-secondary-blue"
        }`}
      >
        {event.start.toLocaleString("default", { weekday: "short" })}
      </div>
    </div>
  )
}

CalEventDate.defaultProps = {
  color: "blue",
}

export default CalEventDate
