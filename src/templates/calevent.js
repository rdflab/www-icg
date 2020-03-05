import React from "react"
import CrumbLayout from "../components/crumblayout"
import CalEventLocation from "../components/calendar/caleventlocation"
import styled from "styled-components"
import Columns from "../components/columns"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"

const LocDiv = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-top: solid 1px lightgray;
  border-bottom: solid 1px lightgray;
`

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
      title={title}
    >
      <Columns>
        <MainColumn>
          <div dangerouslySetInnerHTML={{ __html: calEvent.html }} />

          <LocDiv>
            <CalEventLocation event={calEvent} showDate={true} />
          </LocDiv>
        </MainColumn>
        <SideColumn></SideColumn>
      </Columns>
    </CrumbLayout>
  )
}

export default CalEventTemplate
