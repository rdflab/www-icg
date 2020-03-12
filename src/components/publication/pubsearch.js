import React, { useState } from "react"
import PublicationYears from "./publicationyears"
import Pagination from "../pagination"
import SearchBar from "../search/searchbar"
import YearsFilter from "./yearsfilter"
import Collapsible from "../collapsible"
import SearchSummary from "../search/searchsummary"
//import SideBar from "../sidebar/sidebar"
import Columns from "../columns"
import SideColumn from "../sidecolumn"
import MainColumn from "../maincolumn"
import SmallColumn from "../smallcolumn"
import PubSearchResults from "./pubsearchresults"

const EMPTY_QUERY = ""

const PubSearch = ({ groupMap, peopleMap, allPublications, showLabLink }) => {
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
    <Columns>
      <SmallColumn>
        <SearchBar handleInputChange={handleInputChange} />
      </SmallColumn>
      <MainColumn>
        <PubSearchResults
          publications={yearFilteredPublications}
          pagedPublications={pagedPublications}
          groupMap={groupMap}
          peopleMap={peopleMap}
          page={page}
          recordsPerPage={recordsPerPage}
          showLabLink={showLabLink}
        />
      </MainColumn>
      <SideColumn>
        {/* <SideBar> */}
        <SearchBar handleInputChange={handleInputChange} />
        <Collapsible title="Year filter" height="auto">
          <YearsFilter publications={publications} handleClick={handleClick} />
        </Collapsible>
        {/* </SideBar> */}
      </SideColumn>
    </Columns>
  )
}

PubSearch.defaultProps = {
  showLabLink: false,
}

export default PubSearch
