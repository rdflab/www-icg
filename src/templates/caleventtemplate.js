import React from "react"
import CrumbLayout from "../components/crumblayout"
import CalEventLocation from "../components/calendar/caleventlocation"
import Column from "../components/column"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import CalEventsSideBar from "../components/calendar/caleventssidebar"
import Title from "../components/title"

const CalEventTemplate = props => {
  const { pageContext } = props
  const { calEvent, allCalEvents } = pageContext

  const title = calEvent.frontmatter.title

  calEvent.start = new Date(calEvent.frontmatter.start)
  calEvent.end = new Date(calEvent.frontmatter.end)

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Events", "/events"],
      ]}
    >
      <Column>
        <MainColumn>
          <div className="w-full">
            <Title>{title}</Title>

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
    </CrumbLayout>
  )
}

export default CalEventTemplate
