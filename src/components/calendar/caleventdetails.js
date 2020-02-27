import React from "react"
import styled from "styled-components"
import H4 from "../headings/h4"
import CalEventLocation from "./caleventlocation"
import { Link } from "gatsby"

const StyledTitle = styled.div`
  color: rgba(28, 76, 143, 0.9);
  font-size: x-large;
  margin-bottom: 1rem;
`

const CalEventDetails = ({ event, isMobile }) => {
  const path = `/events/${
    event.frontmatter.start.split("T")[0]
  }-${event.frontmatter.title.toLowerCase().replace(" ", "-")}`

  return (
    <>
      <H4>
        <Link to={path}>{event.frontmatter.title}</Link>
      </H4>
      <CalEventLocation event={event} isMobile={isMobile} />
    </>
  )
}

export default CalEventDetails

CalEventDetails.defaultProps = {
  isMobile: false,
}
