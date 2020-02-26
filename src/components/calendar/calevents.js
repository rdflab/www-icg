import React from "react"
import CalEvent from "./calevent"

const CalEvents = ({ calEvents }) => (
  <>
    {calEvents.map((e, index) => (
      <CalEvent key={index} event={e} />
    ))}
  </>
)

export default CalEvents
