import React, { useState } from "react"
import PublicationYears from "./publicationyears"
import Pagination from "../pagination"
import SearchBar from "../search/searchbar"
import SearchSummary from "../search/searchsummary"

const EMPTY_QUERY = ""

const SimplePubSearch = ({
  groupMap,
  peopleMap,
  allPublications,
  showLabLink,
}) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPublications, setFilteredPublications] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [filterYears, setFilterYears] = useState(new Set())

  const handleInputChange = e => {
    const q = e.target.value
    let ret = []

    for (let publication of allPublications) {
      if (publication.title.toLowerCase().includes(q.toLowerCase())) {
        ret.push(publication)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredPublications(ret)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const handleClick = data => {
    setFilterYears(data)
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let publications = hasSearchResults ? filteredPublications : allPublications

  let yearFilteredPublications

  if (filterYears.size > 0) {
    yearFilteredPublications = publications.filter(publication => {
      return filterYears.has(publication.year)
    })
  } else {
    yearFilteredPublications = publications
  }

  const offset = (page - 1) * recordsPerPage
  let pagedPublications = yearFilteredPublications.slice(
    offset,
    offset + recordsPerPage
  )

  return (
    <>
      <SearchBar handleInputChange={handleInputChange} />

      <SearchSummary
        count={yearFilteredPublications.length}
        single="Publication"
        plural="Publications"
      />

      <PublicationYears
        publications={pagedPublications}
        groupMap={groupMap}
        peopleMap={peopleMap}
        showLabLink={showLabLink}
      />

      <Pagination
        page={page}
        totalRecords={yearFilteredPublications.length}
        recordsPerPage={recordsPerPage}
        pageNeighbours={1}
        onPageChanged={onPageChanged}
      />
    </>
  )
}

SimplePubSearch.defaultProps = {
  showLabLink: true,
}

export default SimplePubSearch
