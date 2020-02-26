import React from "react"
import styled from "styled-components"
import Columns from "../columns"
import Column from "../column"
import CalEventDate from "./caleventdate"
import CalEventDetails from "./caleventdetails"

const StyledEvent = styled.div`
  border-bottom: solid 1px lightgray;
  margin-bottom: 1rem;
`

const CalEvent = ({ event }) => {
  return (
    <StyledEvent>
      <Columns>
        <Column w={2}>
          <CalEventDate event={event} />
        </Column>
        <Column>
          <CalEventDetails event={event} />
        </Column>
      </Columns>
    </StyledEvent>
  )
}

export default CalEvent
