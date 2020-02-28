import React, { useState } from "react"
import Pagination from "../pagination"
import SearchBar from "../searchbar"
import Collapsible from "../collapsible"
import SearchCount from "../searchcount"
import SearchSummary from "../searchsummary"
import SideBar from "../sidebar/sidebar"
import Columns from "../columns"
import Column from "../column"
import DayPicker, { DateUtils } from "react-day-picker"
import "./calendar.scss"
import CalEvents from "./calevents"

const EMPTY_QUERY = ""

const CalSearch = ({ allCalEvents }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredCalEvents, setFilteredCalEvents] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [selectedDays, setSelectedDays] = useState([])

  const handleInputChange = e => {
    const q = e.target.value
    let ret = []

    for (let event of allCalEvents) {
      if (event.frontmatter.title.toLowerCase().includes(q.toLowerCase())) {
        ret.push(event)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredCalEvents(ret)
    setPage(1)
  }

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

    setSelectedDays(selected ? [] : [day])
  }

  console.log(selectedDays)

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let calEvents = hasSearchResults ? filteredCalEvents : allCalEvents

  let dayFilteredEvents = []

  if (selectedDays.length > 0) {
    dayFilteredEvents = calEvents.filter(e => {
      console.log(selectedDays[0], e.start)
      return DateUtils.isSameDay(selectedDays[0], e.start)
    })
  } else {
    dayFilteredEvents = calEvents
  }

  const offset = (page - 1) * recordsPerPage
  let pagedEvents = dayFilteredEvents.slice(offset, offset + recordsPerPage)

  return (
    <Columns>
      <Column w={4} className="is-hidden-tablet">
        <SideBar>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find events"
          />
          <div className="has-text-centered">
            <DayPicker
              selectedDays={selectedDays}
              onDayClick={handleDayClick}
            />
          </div>
        </SideBar>
      </Column>
      <Column>
        <SearchSummary
          count={dayFilteredEvents.length}
          single="Event"
          plural="Events"
        />

        <CalEvents calEvents={dayFilteredEvents} />

        <Pagination
          page={page}
          totalRecords={pagedEvents.length}
          recordsPerPage={recordsPerPage}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />
      </Column>
      <Column w={4} className="is-hidden-mobile">
        <SideBar>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find events"
          />
          <Collapsible title="Date" height="auto">
            <div className="has-text-centered">
              <DayPicker
                selectedDays={selectedDays}
                onDayClick={handleDayClick}
              />
            </div>
          </Collapsible>
        </SideBar>
      </Column>
    </Columns>
  )
}

CalSearch.defaultProps = {
  showLabLink: true,
}

export default CalSearch