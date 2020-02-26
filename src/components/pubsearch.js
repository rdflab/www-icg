import React, { useState } from "react"
import PublicationYears from "./publication/publicationyears"
import Pagination from "./pagination"
import SearchBar from "./searchbar"
import FilterYears from "./filter/filteryears"
import Collapsible from "./collapsible"
import SearchCount from "../components/searchcount"
import SearchSummary from "./searchsummary"
import SideBar from "./sidebar/sidebar"
import Columns from "./columns"
import Column from "./column"

const EMPTY_QUERY = ""

const PubSearch = ({ labMap, peopleMap, allPublications, showLabLink }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPublications, setFilteredPublications] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [FilterYears, setFilterYears] = useState(new Set())

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

  if (FilterYears.size > 0) {
    yearFilteredPublications = publications.filter(publication => {
      return FilterYears.has(publication.year)
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
      <Column w={4} className="is-hidden-tablet">
        <SideBar>
          <SearchBar handleInputChange={handleInputChange} />
          <Collapsible title="Year filter" height="auto">
            <FilterYears
              publications={publications}
              handleClick={handleClick}
            />
          </Collapsible>
        </SideBar>
      </Column>
      <Column>
        <SearchSummary>
          <SearchCount>{yearFilteredPublications.length}</SearchCount>{" "}
          {yearFilteredPublications.length === 1
            ? "Publication"
            : "Publications"}{" "}
          found
        </SearchSummary>

        <PublicationYears
          publications={pagedPublications}
          labMap={labMap}
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
      </Column>
      <Column w={4} className="is-hidden-mobile">
        <SideBar>
          <SearchBar handleInputChange={handleInputChange} />
          <Collapsible title="Year filter" height="auto">
            <FilterYears
              publications={publications}
              handleClick={handleClick}
            />
          </Collapsible>
        </SideBar>
      </Column>
    </Columns>
  )
}

PubSearch.defaultProps = {
  showLabLink: true,
}

export default PubSearch
