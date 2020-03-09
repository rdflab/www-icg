import React, { useState } from "react"
import CrumbLayout from "../components/crumblayout"
import SiteSearch from "../components/search/sitesearch"
import HideSmall from "../components/hidesmall"
import SearchBar from "../components/search/searchbar"
import Labs from "../components/lab/labs"
import SearchSummary from "../components/search/searchsummary"

const EMPTY_QUERY = ""

const LabsTemplate = ({ pageContext }) => {
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
      headerComponent={<SiteSearch searchData={searchData} />}
      // titleComponent={
      //   <SearchSummary count={groups.length} single="Lab" plural="Labs" />
      // }
    >
      {/* <SearchBar
        handleInputChange={handleInputChange}
        placeholder="Type to find labs"
        text={query}
        className="my-4"
      /> */}

      <Labs pagedGroups={pagedGroups} peopleMap={peopleMap} />
    </CrumbLayout>
  )
}

export default LabsTemplate
