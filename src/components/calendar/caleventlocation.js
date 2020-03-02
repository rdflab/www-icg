import React from "react"
import styled from "styled-components"
import Columns from "../columns"
import Column from "../column"
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"

const StyledDetails = styled.div`
  color: gray;
`

const CalEventLocation = ({ event, showDate, isMobile }) => {
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

  let date

  if (showDate) {
    date = `${event.start.toLocaleString("default", {
      month: "long",
    })} ${event.start.toLocaleString("default", {
      day: "numeric",
    })}, ${event.start.toLocaleString("default", { year: "numeric" })}`
  } else {
    date = ""
  }

  if (isMobile) {
    return (
      <>
        <Columns isMobile={isMobile}>
          <Column w="2/12" isMobile={true} className="text-center">
            <StyledDetails>
              <FaRegClock size={28} />
            </StyledDetails>
          </Column>
          <Column isMobile={isMobile} w="10/12">
            {showDate && <StyledDetails>{date}</StyledDetails>}
            <StyledDetails>
              {st} - {et}
            </StyledDetails>
          </Column>
        </Columns>
        <Columns isMobile={isMobile} className="mt-2">
          <Column w="2/12" isMobile={true} className="text-center">
            <StyledDetails>
              <FaMapMarkerAlt size={28} />
            </StyledDetails>
          </Column>
          <Column isMobile={true} w="10/12">
            <StyledDetails>{event.frontmatter.location}</StyledDetails>
          </Column>
        </Columns>
      </>
    )
  } else {
    return (
      <>
        <Columns>
          <Column w="1/12" className="text-center">
            <StyledDetails>
              <FaRegClock size={28} />
            </StyledDetails>
          </Column>
          <Column w="5/12">
            {showDate && <StyledDetails>{date}</StyledDetails>}
            <StyledDetails>
              {st} - {et}
            </StyledDetails>
          </Column>
          <Column w="1/12" className="text-center">
            <StyledDetails>
              <FaMapMarkerAlt size={28} />
            </StyledDetails>
          </Column>
          <Column w="5/12">
            <StyledDetails>{event.frontmatter.location}</StyledDetails>
          </Column>
        </Columns>
      </>
    )
  }
}

export default CalEventLocation

CalEventLocation.defaultProps = {
  showDate: false,
  isMobile: false,
}
