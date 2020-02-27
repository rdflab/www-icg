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
      <div className="is-hidden-tablet">
        <Columns className="is-mobile">
          <Column w={3}>
            <CalEventDate event={event} />
          </Column>
        </Columns>
        <Columns>
          <Column>
            <CalEventDetails event={event} isMobile={true} />
          </Column>
        </Columns>
      </div>
      <div className="is-hidden-mobile">
        <Columns>
          <Column w={2}>
            <CalEventDate event={event} />
          </Column>
          <Column>
            <CalEventDetails event={event} />
          </Column>
        </Columns>
      </div>
    </StyledEvent>
  )
}

export default CalEvent
