import React, { useState } from "react"
import PublicationYears from "./publicationyears"
import Pagination from "./pagination"
import SearchBar from "./searchbar"
import YearsFilter from "./yearsfilter"
import Collapsible from "./collapsible"
import SearchCount from "../components/searchcount"

const EMPTY_QUERY = ""

const PubSearch = ({ labMap, peopleMap, allPublications, showLabLink }) => {
  console.log(peopleMap.size, peopleMap)

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPublications, setFilteredPublications] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [yearsFilter, setYearsFilter] = useState(new Set())

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
    console.log(currentPage)

    setPage(currentPage)
  }

  const handleClick = data => {
    setYearsFilter(data)
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let publications = hasSearchResults ? filteredPublications : allPublications

  let yearFilteredPublications

  if (yearsFilter.size > 0) {
    yearFilteredPublications = publications.filter(publication => {
      return yearsFilter.has(publication.year)
    })
  } else {
    yearFilteredPublications = publications
  }

  const offset = (page - 1) * recordsPerPage
  let pagedPublications = yearFilteredPublications.slice(
    offset,
    offset + recordsPerPage
  )

  console.log(
    "slop",
    query,
    offset,
    page,
    recordsPerPage,
    pagedPublications.length,
    hasSearchResults
  )
  return (
    <>
      <div className="columns">
        <div className="column is-one-third">
          <SearchBar handleInputChange={handleInputChange} />
          <Collapsible title="Year filter" height="auto">
            <YearsFilter
              publications={publications}
              handleClick={handleClick}
            />
          </Collapsible>
        </div>
        <div className="column">
          <div>
            <SearchCount>{yearFilteredPublications.length}</SearchCount>{" "}
            {yearFilteredPublications.length === 1
              ? "Publication"
              : "Publications"}{" "}
            found
          </div>
          <PublicationYears
            publications={pagedPublications}
            labMap={labMap}
            showLabLink={showLabLink}
          />

          <Pagination
            page={page}
            totalRecords={yearFilteredPublications.length}
            recordsPerPage={recordsPerPage}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
          />
        </div>
      </div>
    </>
  )
}

PubSearch.defaultProps = {
  showLabLink: true,
}

export default PubSearch
