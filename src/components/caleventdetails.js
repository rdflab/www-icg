import React from "react"
import styled from "styled-components"
import Columns from "./columns"
import Column from "./column"
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"

const StyledTitle = styled.div`
  font-size: x-large;
  margin-bottom: 1rem;
`

const ClockIcon = styled(FaRegClock)`
  color: lightgray;
`

const MapIcon = styled(FaMapMarkerAlt)`
  color: lightgray;
`

const CalEventDetails = ({ event, startDate, endDate }) => {
  const st = startDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
  const et = endDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  return (
    <>
      <StyledTitle>{event.title}</StyledTitle>
      <Columns>
        <Column w={1}>
          <ClockIcon size={28} />
        </Column>

        <Column w={5}>
          {st} - {et}
        </Column>
        <Column w={1}>
          <MapIcon size={28} />
        </Column>
        <Column w={5}>{event.location}</Column>
      </Columns>
    </>
  )
}

export default CalEventDetails
