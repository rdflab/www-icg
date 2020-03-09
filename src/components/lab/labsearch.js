import React, { useState } from "react"
import SearchBar from "../search/searchbar"
import Columns from "../columns"
import Column from "../column"
//import SideBar from "./sidebar/sidebar"
import SmallColumn from "../smallcolumn"
import SideColumn from "../sidecolumn"
import MainColumn from "../maincolumn"
import LabSearchResults from "./labsearchresults"

const EMPTY_QUERY = ""

const LabSearch = ({ allGroups, peopleMap }) => {
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
    <Columns>
      <SmallColumn>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find labs..."
        />
      </SmallColumn>
      <MainColumn>
        <LabSearchResults
          groups={groups}
          pagedGroups={pagedGroups}
          peopleMap={peopleMap}
          page={page}
          recordsPerPage={recordsPerPage}
          onPageChanged={onPageChanged}
        />
      </MainColumn>
      <SideColumn>
        {/* <SideBar> */}
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find labs"
        />
        {/* </SideBar> */}
      </SideColumn>
    </Columns>
  )
}

export default LabSearch
