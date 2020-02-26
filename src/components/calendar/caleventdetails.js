import React from "react"
import styled from "styled-components"
import Columns from "../columns"
import Column from "../column"
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"
import BodyLink from "../bodylink"

const StyledTitle = styled.div`
  color: rgba(28, 76, 143, 0.9);
  font-size: x-large;
  margin-bottom: 1rem;
`
const StyledDetails = styled.div`
  color: gray;
`

const CalEventDetails = ({ event }) => {
  const st = event.start.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
  const et = event.end.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  const path = `/events/${
    event.frontmatter.start.split("T")[0]
  }-${event.frontmatter.title.toLowerCase().replace(" ", "-")}`

  return (
    <>
      <BodyLink to={path}>{event.frontmatter.title}</BodyLink>
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
