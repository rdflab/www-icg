import React from "react"
import CrumbLayout from "../components/crumblayout"
import CalEventLocation from "../components/calendar/caleventlocation"
import Column from "../components/column"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import CalEventsSideBar from "../components/calendar/caleventssidebar"
import Title from "../components/title"
import H from "../components/headings/h"
import Container from "../components/container"

const CalEventTemplate = props => {
  const { pageContext } = props
  const { calEvent, allCalEvents } = pageContext

  const title = calEvent.frontmatter.title

  //calEvent.start = new Date(calEvent.frontmatter.start)
  //calEvent.end = new Date(calEvent.frontmatter.end)

  return (
    <CrumbLayout crumbs={[["Events", "/events"]]}>
      <H>{title}</H>
      <Container className="py-8">
        <Column>
          <MainColumn className="mr-16">
            <div className="w-full">
              <div dangerouslySetInnerHTML={{ __html: calEvent.html }} />

              <div className="my-4 py-4 border-t border-b border-solid border-gray-400">
                <CalEventLocation event={calEvent} showDate={true} />
              </div>
            </div>
          </MainColumn>
          <SideColumn>
            <CalEventsSideBar events={allCalEvents} />
          </SideColumn>
        </Column>
      </Container>
    </CrumbLayout>
  )
}

export default CalEventTemplate
