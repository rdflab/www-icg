import React from "react"
import Pagination from "../pagination"
import SearchSummary from "../search/searchsummary"
import EmailLink from "../emaillink"
import MembersLink from "../memberslink"
import PublicationsLink from "../publication/publicationslink"
import Column from "../column"

//import SideBar from "./sidebar/sidebar"
import TextLink from "../textlink"
import Labs from "./labs"

const LabSearchResults = ({
  groups,
  pagedGroups,
  peopleMap,
  page,
  recordsPerPage,
  onPageChanged,
}) => (
  <div className="mt-8">
    <SearchSummary count={groups.length} single="Lab" plural="Labs" />

    <Labs pagedGroups={pagedGroups} peopleMap={peopleMap} />

    <Pagination
      page={page}
      totalRecords={groups.length}
      recordsPerPage={recordsPerPage}
      pageNeighbours={1}
      onPageChanged={onPageChanged}
    />
  </div>
)

export default LabSearchResults
