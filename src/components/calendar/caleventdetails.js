import React from "react"
import styled from "styled-components"
import Columns from "../columns"
import Column from "../column"
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"
import BodyLink from "../bodylink"
import H4 from "../headings/h4"
import CalEventLocation from "./caleventlocation"

const StyledTitle = styled.div`
  color: rgba(28, 76, 143, 0.9);
  font-size: x-large;
  margin-bottom: 1rem;
`
const StyledDetails = styled.div`
  color: gray;
`

const CalEventDetails = ({ event, isMobile }) => {
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
      <H4>
        <BodyLink to={path}>{event.frontmatter.title}</BodyLink>
      </H4>
      <CalEventLocation event={event} isMobile={isMobile} />
    </>
  )
}

export default CalEventDetails

CalEventDetails.defaultProps = {
  isMobile: false,
}
