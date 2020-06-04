import React, { useState } from "react"
import PublicationYears from "./publicationyears"
import Pagination from "../pagination"
import SearchBar from "../search/searchbar"
import HideSmall from "../hidesmall"
import YearSelector from "../filter/yearselector"
import Column from "../column"

const EMPTY_QUERY = ""

const SimplePubSearch = ({
  allPublications,
  showSearch,
  showYears,
  sectionMode,
  showLabLink,
}) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPublications, setFilteredPublications] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [filterYears, setFilterYears] = useState([])

  const handleInputChange = (e) => {
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

  const onPageChanged = (data) => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const handleClick = (data) => {
    setFilterYears(data)
    setPage(1)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let publications = hasSearchResults ? filteredPublications : allPublications

  let yearFilteredPublications

  if (filterYears.length > 0 && filterYears[0] !== "All") {
    yearFilteredPublications = publications.filter((publication) => {
      return filterYears.includes(publication.year)
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
      {showSearch && (
        <SearchBar
          handleInputChange={handleInputChange}
          className="my-4 sm:w-1/2 mx-auto"
          placeholder="Type to find publications..."
          text={query}
        />
      )}

      {showYears && (
        <HideSmall>
          <Column isVCentered={true} isCentered={true}>
            <div>
              <YearSelector onClick={handleClick} />
            </div>
          </Column>
        </HideSmall>
      )}

      {/* <SearchSummary
        count={yearFilteredPublications.length}
        single="Publication"
        plural="Publications"
      /> */}

      <PublicationYears
        publications={pagedPublications}
        showLabLink={showLabLink}
        sectionMode={sectionMode}
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
  showSearch: false,
  sectionMode: "main",
  showYears: false,
}

export default SimplePubSearch
