import React, { useState } from "react"
import CrumbLayout from "../components/crumblayout"
import SearchBar from "../components/search/searchbar"
import PubSearchResults from "../components/publication/pubsearchresults"
import HideSmall from "../components/hidesmall"
import SearchSummary from "../components/search/searchsummary"

const EMPTY_QUERY = ""

const PublicationsV2Template = ({ pageContext }) => {
  const { groupMap, peopleMap, allPublications } = pageContext

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

  if (filterYears.length > 0) {
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
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Publications", "/research-areas/publications"],
      ]}
      selectedTab="Publications"
      title="Publications"
      headerComponent={
        <HideSmall className="w-1/3">
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find publications..."
            text={query}
          />
        </HideSmall>
      }
      titleComponent={
        <SearchSummary
          count={yearFilteredPublications.length}
          single="Publication"
          plural="Publications"
        />
      }
    >
      <SearchBar
        className="sm:hidden"
        handleInputChange={handleInputChange}
        placeholder="Type to find faculty..."
        text={query}
      />

      <PubSearchResults
        publications={yearFilteredPublications}
        pagedPublications={pagedPublications}
        groupMap={groupMap}
        peopleMap={peopleMap}
        page={page}
        recordsPerPage={recordsPerPage}
        onPageChanged={onPageChanged}
        showLabLink={true}
      />
    </CrumbLayout>
  )
}

export default PublicationsV2Template
