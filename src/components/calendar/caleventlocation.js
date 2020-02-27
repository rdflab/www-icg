import React from "react"
import styled from "styled-components"
import Columns from "../columns"
import Column from "../column"
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"

const StyledDetails = styled.div`
  color: gray;
`

const CalEventLocation = ({ event, isMobile }) => {
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

  if (isMobile) {
    return (
      <>
        <Columns className="is-mobile is-vcentered">
          <Column w={2} className="has-text-centered">
            <StyledDetails>
              <FaRegClock size={28} />
            </StyledDetails>
          </Column>

          <Column>
            <StyledDetails>
              {st} - {et}
            </StyledDetails>
          </Column>
        </Columns>
        <Columns className="is-mobile is-vcentered">
          <Column w={2} className="has-text-centered">
            <StyledDetails>
              <FaMapMarkerAlt size={28} />
            </StyledDetails>
          </Column>
          <Column>
            <StyledDetails>{event.frontmatter.location}</StyledDetails>
          </Column>
        </Columns>
      </>
    )
  } else {
    return (
      <>
        <Columns className="is-mobile is-vcentered">
          <Column w={1} className="has-text-centered">
            <StyledDetails>
              <FaRegClock size={28} />
            </StyledDetails>
          </Column>
          <Column>
            <StyledDetails>
              {st} - {et}
            </StyledDetails>
          </Column>
          <Column w={1} className="has-text-centered">
            <StyledDetails>
              <FaMapMarkerAlt size={28} />
            </StyledDetails>
          </Column>
          <Column>
            <StyledDetails>{event.frontmatter.location}</StyledDetails>
          </Column>
        </Columns>
      </>
    )
  }
}

export default CalEventLocation

CalEventLocation.defaultProps = {
  isMobile: false,
}
