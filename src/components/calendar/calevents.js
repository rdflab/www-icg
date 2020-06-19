import React from "react"
import CalEvent from "./calevent"

const CalEvents = ({ calEvents, imageMap }) => (
  <div className="w-full">
    {calEvents.map((e, index) => (
      <CalEvent key={index} event={e} imageMap={imageMap} />
    ))}
  </div>
)

CalEvents.defaultProps = {
  imageMap: {},
}

export default CalEvents
