import React from "react"
import Pagination from "../pagination"
import PeopleTypes from "./peopletypes"

const PeopleSearchResults = ({
  people,
  pagedPeople,
  page,
  recordsPerPage,
  imageMap,
  showLabLink,
  onPageChanged,
}) => (
  <div className="w-full mt-8">
    {/* <SearchSummary count={people.length} single="Member" plural="Members" /> */}

    <PeopleTypes
      imageMap={imageMap}
      allPeople={pagedPeople}
      showLabLink={showLabLink}
    />
    <div className="has-text-centered">
      <Pagination
        page={page}
        totalRecords={people.length}
        recordsPerPage={recordsPerPage}
        pageNeighbours={1}
        onPageChanged={onPageChanged}
      />
    </div>
  </div>
)

PeopleSearchResults.defaultProps = {
  showLabLink: true,
  imageMap: {},
}

export default PeopleSearchResults
