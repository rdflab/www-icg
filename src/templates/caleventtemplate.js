import React from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import CalEventLocation from "../components/calendar/caleventlocation"
import Column from "../components/column"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import CalEventsSideBar from "../components/calendar/caleventssidebar"
import Container from "../components/container"
import getEventType from "../components/calendar/caleventype"
import ShareLinks from "../components/share/sharelinks"

import HTMLDiv from "../components/htmldiv"

const CalEventTemplate = ({ path, pageContext }) => {
  const { calEvent, allCalEvents } = pageContext

  const title = calEvent.frontmatter.title

  //calEvent.start = new Date(calEvent.frontmatter.start)
  //calEvent.end = new Date(calEvent.frontmatter.end)

  return (
    <CrumbTitleLayout
      path={path}
      nav={"Event"}
      title={title}
      subTitle={getEventType(calEvent)}
      crumbs={[["Events", "/events"]]}
      menuComponent={<ShareLinks path={path} />}
    >
      <Container className="my-16">
        <Column>
          <MainColumn className="mr-16">
            <div className="w-full">
              <HTMLDiv html={calEvent.html} className="text-lg" />

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
    </CrumbTitleLayout>
  )
}

export default CalEventTemplate
