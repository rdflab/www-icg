import React, { useEffect, useState } from "react"
import CrumbLayout from "../components/crumblayout"
import SearchBar from "../components/search/searchbar"
import SiteSearch from "../components/search/sitesearch"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import Column from "../components/column"
import CalSearchResults from "../components/calendar/calsearchresults"
import DayPicker, { DateUtils } from "react-day-picker"
import "../../node_modules/react-day-picker/lib/style.css"
import "../components/calendar/calendar.scss"
import Title from "../components/title"

const EMPTY_QUERY = ""

const CalEventsTemplate = ({ pageContext }) => {
  const { allCalEvents } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredCalEvents, setFilteredCalEvents] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [selectedDays, setSelectedDays] = useState([])

  useEffect(() => {
    for (let calEvent of allCalEvents) {
      if (calEvent.start === undefined) {
        calEvent.start = new Date(calEvent.frontmatter.start)
        calEvent.end = new Date(calEvent.frontmatter.end)
      }
    }
  }, [])

  const handleDayClick = (day, { selected }) => {
    // const { selectedDays } = this.state;
    // if (selected) {
    //   const selectedIndex = selectedDays.findIndex(selectedDay =>
    //     DateUtils.isSameDay(selectedDay, day)
    //   );
    //   selectedDays.splice(selectedIndex, 1);
    // } else {
    //   selectedDays.push(day);
    // }
    setQuery("")
    setSelectedDays(selected ? [] : [day])
    setPage(1)
  }

  const handleInputChange = e => {
    const q = e.target.value.toLowerCase()
    let ret = []

    for (let event of allCalEvents) {
      const day = event.start.toLocaleString("default", { day: "numeric" })
      const month = event.start
        .toLocaleString("default", { month: "short" })
        .toLowerCase()
      const title = event.frontmatter.title.toLowerCase()

      if (title.includes(q) || day === q || month === q) {
        ret.push(event)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredCalEvents(ret)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  let calEvents

  if (query !== EMPTY_QUERY) {
    calEvents = filteredCalEvents
  } else {
    let dayFilteredEvents = []

    if (selectedDays.length > 0) {
      calEvents = allCalEvents.filter(e => {
        return DateUtils.isSameDay(selectedDays[0], e.start)
      })
    } else {
      const now = Date.now()

      calEvents = allCalEvents.filter(e => {
        return e.start >= now
      })
    }
  }

  const offset = (page - 1) * recordsPerPage
  let pagedEvents = calEvents.slice(offset, offset + recordsPerPage)

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Events", "/events"],
      ]}
      headerComponent={<SiteSearch />}
      // titleComponent={
      //   <SearchSummary
      //     count={calEvents.length}
      //     single="Event"
      //     plural="Events"
      //   />
      // }
    >
      {/* <HideSmall>
        <div className="row items-center justify-between">
          <div className="w-1/3">
            <SearchBar
              handleInputChange={handleInputChange}
              placeholder="Type to find events..."
              text={query}
            />
          </div>
          <div></div>
        </div>
      </HideSmall> */}

      <Column>
        {/* <SmallColumn>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find events..."
        />
        <div className="text-center">
          <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />
        </div>
      </SmallColumn> */}
        <MainColumn>
          <div className="w-full">
            <div>
              <Title>Events</Title>
            </div>

            {/* <div className="w-1/2"> */}
            <SearchBar
              handleInputChange={handleInputChange}
              placeholder="Type to find events..."
              text={query}
            />
            {/* </div> */}

            {/* <Column className="justify-between">
              <div>
                <Title>Events</Title>
              </div>
              <div className="w-1/2">
                <SearchBar
                  handleInputChange={handleInputChange}
                  placeholder="Type to find events..."
                  text={query}
                />
              </div>
            </Column> */}

            <CalSearchResults
              events={calEvents}
              pagedEvents={pagedEvents}
              page={page}
              recordsPerPage={recordsPerPage}
              onPageChanged={onPageChanged}
            />
          </div>
        </MainColumn>
        <SideColumn>
          {/* <SideBar> */}
          {/* <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find events..."
        /> */}
          {/* <Collapsible title="Filter By Date" height="auto"> */}

          <DayPicker selectedDays={selectedDays} onDayClick={handleDayClick} />

          {/* </Collapsible> */}
          {/* </SideBar> */}
        </SideColumn>
      </Column>
    </CrumbLayout>
  )
}

export default CalEventsTemplate
