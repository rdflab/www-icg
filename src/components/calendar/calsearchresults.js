import React from "react"
import Pagination from "../pagination"
import CalEvents from "./calevents"

const CalSearchResults = ({
  events,
  imageMap,
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

    <CalEvents calEvents={events} imageMap={imageMap} />

    <Pagination
      page={page}
      totalRecords={pagedEvents.length}
      recordsPerPage={recordsPerPage}
      pageNeighbours={1}
      onPageChanged={onPageChanged}
    />
  </div>
)

CalSearchResults.defaultProps = {
  imageMap: {},
}

export default CalSearchResults
