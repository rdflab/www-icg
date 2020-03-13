import React from "react"
import CalEvent from "./calevent"

const CalEvents = ({ calEvents }) => (
  <div className="w-full">
    {calEvents.map((e, index) => (
      <CalEvent key={index} event={e} />
    ))}
  </div>
)

export default CalEvents
