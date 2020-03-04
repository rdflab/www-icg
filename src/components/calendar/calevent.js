import React from "react"
import Columns from "../columns"
import Column from "../column"
import CalEventDate from "./caleventdate"
import CalEventDetails from "./caleventdetails"

const CalEvent = ({ event }) => {
  return (
    <div className="border-b border-solid gray-border mb-4 pb-4">
      <div className="sm:hidden">
        <Columns isMobile={true}>
          <Column w="3/12" isMobile={true}>
            <CalEventDate event={event} />
          </Column>
        </Columns>
        <CalEventDetails event={event} isMobile={true} />
      </div>
      <div className="hidden sm:block">
        <Columns>
          <Column w="2/12" className="mr-2">
            <CalEventDate event={event} />
          </Column>
          <Column w="10/12">
            <CalEventDetails event={event} />
          </Column>
        </Columns>
      </div>
    </div>
  )
}

export default CalEvent
