import React from "react"
import Pagination from "../pagination"
import CalEvents from "./calevents"

const CalSearchResults = ({
  events,
  pagedEvents,
  page,
  recordsPerPage,
  onPageChanged,
}) => (
  <div className="w-full mt-8">
    {/* <SearchSummary
          count={events.length}
          single="Event"
          plural="Events"
        /> */}

    <CalEvents calEvents={events} />

    <Pagination
      page={page}
      totalRecords={pagedEvents.length}
      recordsPerPage={recordsPerPage}
      pageNeighbours={1}
      onPageChanged={onPageChanged}
    />
  </div>
)

export default CalSearchResults
