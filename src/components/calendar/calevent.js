import React from "react"
import styled from "styled-components"
import Columns from "../columns"
import Column from "../column"
import CalEventDate from "./caleventdate"
import CalEventDetails from "./caleventdetails"

const StyledEvent = styled.div`
  border-bottom: solid 1px lightgray;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
`

const CalEvent = ({ event }) => {
  return (
    <StyledEvent>
      <div className="sm:hidden">
        <Columns>
          <Column w="1/4">
            <CalEventDate event={event} />
          </Column>
        </Columns>
        <Columns>
          <Column>
            <CalEventDetails event={event} isMobile={true} />
          </Column>
        </Columns>
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
    </StyledEvent>
  )
}

export default CalEvent
