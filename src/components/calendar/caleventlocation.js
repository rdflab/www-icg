import React from "react"
import Columns from "../columns"
import Column from "../column"
import { FaRegClock, FaMapMarkerAlt } from "react-icons/fa"
import Row from "../row"

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

  return (
    <>
      <div className="sm:hidden gray">
        <Row className="items-center">
          <div className="mr-4">
            <FaRegClock size={28} />
          </div>
          <div>
            {showDate && <div>{date}</div>}
            <div>
              {st} - {et}
            </div>
          </div>
        </Row>
        <Row className="items-center mt-4">
          <div className="mr-4">
            <FaMapMarkerAlt size={28} />
          </div>
          <div>{event.frontmatter.location}</div>
        </Row>
      </div>

      <div className="hidden sm:block">
        <Columns className="gray items-center">
          <Column w="1/12">
            <FaRegClock size={28} />
          </Column>
          <Column w="5/12">
            {showDate && <div>{date}</div>}
            <div>
              {st} - {et}
            </div>
          </Column>
          <Column w="1/12">
            <FaMapMarkerAlt size={28} />
          </Column>
          <Column isMobile={true} w="5/12">
            {event.frontmatter.location}
          </Column>
        </Columns>
      </div>
    </>
  )
}

export default CalEventLocation

CalEventLocation.defaultProps = {
  showDate: false,
  isMobile: false,
}
