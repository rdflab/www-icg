import React from "react"

const CalEventDate = ({ event }) => {
  return (
    <div className="text-center text-blue-columbia mb-4 w-full">
      <div className="uppercase text-sm">
        {event.start.toLocaleString("default", { month: "short" })}
      </div>
      <div className="uppercase font-light text-3xl">
        {event.start.toLocaleString("default", { day: "numeric" })}
      </div>
      <div className="uppercase text-sm bg-blue-columbia text-white px-2">
        {event.start.toLocaleString("default", { weekday: "short" })}
      </div>
    </div>
  )
}

export default CalEventDate
