import React, { useState } from "react"
import PeopleList from "./peoplelist"
import Pagination from "./pagination"
import SearchBar from "./searchbar"
import SearchCount from "./searchcount"
import PeopleTypes from "./peopletypes"
import TypesFilter from "./typesfilter"
import Collapsible from "./collapsible"

const EMPTY_QUERY = ""

const PeopleSearch = ({ labMap, allPeople, showLabLink }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPeople, setFilteredPeople] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [typesFilter, setTypesFilter] = useState(new Set())

  const handleInputChange = e => {
    const q = e.target.value
    let ret = []

    for (let people of allPeople) {
      if (
        people.firstName.toLowerCase().includes(q.toLowerCase()) ||
        people.lastName.toLowerCase().includes(q.toLowerCase())
      ) {
        ret.push(people)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredPeople(ret)
    setPage(1)
  }

  const handleClick = data => {
    setTypesFilter(data)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    console.log(currentPage)

    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let people = hasSearchResults ? filteredPeople : allPeople

  let typeFilteredPeople

  if (typesFilter.size > 0) {
    typeFilteredPeople = people.filter(person => {
      let keep = false

      for (let tag of person.tags) {
        for (let type of typesFilter) {
          if (tag.includes(type)) {
            keep = true
            break
          }

          if (keep) {
            break
          }
        }
      }

      return keep
    })
  } else {
    typeFilteredPeople = people
  }

  const offset = (page - 1) * recordsPerPage
  let pagedPeople = typeFilteredPeople.slice(offset, offset + recordsPerPage)

  return (
    <>
      <div className="columns">
        <div className="column is-4">
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find faculty..."
          />
          <Collapsible title="Type filter" height="auto">
            <TypesFilter handleClick={handleClick} />
          </Collapsible>
        </div>
        <div className="column">
          <div style={{paddingBottom : "2rem"}}>
            <SearchCount>{typeFilteredPeople.length}</SearchCount> Research Faculty and
            Staff found
          </div>
          <PeopleTypes
            allPeople={pagedPeople}
            labMap={labMap}
            showLabLink={showLabLink}
          />

          <Pagination
            page={page}
            totalRecords={typeFilteredPeople.length}
            recordsPerPage={recordsPerPage}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
          />
        </div>
      </div>
    </>
  )
}

PeopleSearch.defaultProps = {
  showLabLink: true,
}

export default PeopleSearch
