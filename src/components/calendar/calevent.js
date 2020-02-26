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
  let startDate = new Date(event.frontmatter.start)
  let endDate = new Date(event.frontmatter.end)

  return (
    <StyledEvent>
      <Columns>
        <Column w={2}>
          <CalEventDate event={event} date={startDate} />
        </Column>
        <Column>
          <CalEventDetails
            event={event}
            startDate={startDate}
            endDate={endDate}
          />
        </Column>
      </Columns>
    </StyledEvent>
  )
}

export default CalEvent
