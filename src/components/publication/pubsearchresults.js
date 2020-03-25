import React from "react"
import PublicationYears from "./publicationyears"
import Pagination from "../pagination"
//import SideBar from "../sidebar/sidebar"

const PubSearchResults = ({
  publications,
  pagedPublications,
  page,
  recordsPerPage,
  onPageChanged,
  showLabLink,
}) => (
  <div className="mt-8">
    {/* <SearchSummary
      count={publications.length}
      single="Publication"
      plural="Publications"
    /> */}

    <PublicationYears
      publications={pagedPublications}
      showLabLink={showLabLink}
    />

    <Pagination
      page={page}
      totalRecords={publications.length}
      recordsPerPage={recordsPerPage}
      pageNeighbours={1}
      onPageChanged={onPageChanged}
    />
  </div>
)

PubSearchResults.defaultProps = {
  showLabLink: false,
}

export default PubSearchResults
