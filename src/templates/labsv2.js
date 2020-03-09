import React, { useState } from "react"
import CrumbLayout from "../components/crumblayout"
import GlobalSearch from "../components/search/globalsearch"
import HideSmall from "../components/hidesmall"
import LabSearchResults from "../components/lab/labsearchresults"
import SearchBar from "../components/search/searchbar"

const EMPTY_QUERY = ""

const LabsV2Template = ({ pageContext }) => {
  const { allGroups, peopleMap, searchData } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredGroups, setFilteredGroups] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)

  const handleInputChange = e => {
    const q = e.target.value
    let ret = []

    for (let group of allGroups) {
      if (group.frontmatter.name.toLowerCase().includes(q.toLowerCase())) {
        ret.push(group)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredGroups(ret)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let groups = hasSearchResults ? filteredGroups : allGroups

  const offset = (page - 1) * recordsPerPage
  let pagedGroups = groups.slice(offset, offset + recordsPerPage)

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Labs", "/research-areas/labs"],
      ]}
      title="Research Labs"
      headerComponent={
        <HideSmall className="w-1/3">
          <GlobalSearch searchData={searchData} />
        </HideSmall>
      }
      titleComponent={
        <HideSmall className="w-1/3">
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find labs"
          />
        </HideSmall>
      }
    >
      <LabSearchResults
        groups={pagedGroups}
        pagedGroups={pagedGroups}
        peopleMap={peopleMap}
        page={page}
        recordsPerPage={recordsPerPage}
        onPageChanged={onPageChanged}
      />
    </CrumbLayout>
  )
}

export default LabsV2Template
