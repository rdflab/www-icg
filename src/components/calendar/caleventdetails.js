import React from "react"
import styled from "styled-components"
import Columns from "../columns"
import Column from "../column"
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"

const StyledTitle = styled.div`
  color: rgba(28, 76, 143, 0.9);
  font-size: x-large;
  margin-bottom: 1rem;
`
const StyledDetails = styled.div`
  color: gray;
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
      <StyledTitle>{event.frontmatter.title}</StyledTitle>
      <Columns>
        <Column w={1}>
          <StyledDetails>
            <FaRegClock size={28} />
          </StyledDetails>
        </Column>

        <Column w={5}>
          <StyledDetails>
            {st} - {et}
          </StyledDetails>
        </Column>
        <Column w={1}>
          <StyledDetails>
            <FaMapMarkerAlt size={28} />
          </StyledDetails>
        </Column>
        <Column w={5}>
          <StyledDetails>{event.frontmatter.location}</StyledDetails>
        </Column>
      </Columns>
    </>
  )
}

export default CalEventDetails
