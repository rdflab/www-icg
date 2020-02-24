import React, { useState } from "react"
import Pagination from "./pagination"
import SearchBar from "./searchbar"
import SearchCount from "./searchcount"
import PeopleTypes from "./peopletypes"
import TypesFilter from "./typesfilter"
import Collapsible from "./collapsible"
import toPeopleTypeMap from "../utils/peopletypemap"
import { PEOPLE_TYPES } from "../constants"
import SearchSummary from "./searchsummary"
import SideBar from "./sidebar"
import Columns from "./columns"
import Column from "./column"

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
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let people = hasSearchResults ? filteredPeople : allPeople

  let typeFilteredPeople

  if (typesFilter.size > 0) {
    typeFilteredPeople = people.filter(person => {
      let keep = false

      for (let type of typesFilter) {
        if (person.type.includes(type)) {
          keep = true
          break
        }
      }

      return keep
    })
  } else {
    typeFilteredPeople = people
  }

  const offset = (page - 1) * recordsPerPage
  //let pagedPeople = typeFilteredPeople.slice(offset, offset + recordsPerPage)

  const peopleTypeMap = toPeopleTypeMap(typeFilteredPeople)

  var c = 0
  let typeOrderedPeople = []
  // extract number of records
  for (let type of PEOPLE_TYPES) {
    let p = peopleTypeMap[type]

    for (let person of p) {
      if (c >= offset) {
        typeOrderedPeople.push(person)
      }

      ++c

      if (typeOrderedPeople.length === recordsPerPage) {
        break
      }
    }

    if (typeOrderedPeople.length === recordsPerPage) {
      break
    }
  }

  return (
    <Columns>
      <Column w={4} className="is-hidden-tablet">
        <SideBar>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find faculty..."
          />
          <Collapsible title="Type filter" height="auto">
            <TypesFilter handleClick={handleClick} />
          </Collapsible>
        </SideBar>
      </Column>
      <Column>
        <SearchSummary>
          <SearchCount>{typeFilteredPeople.length}</SearchCount> Research
          Faculty and Staff found
        </SearchSummary>

        <PeopleTypes
          allPeople={typeOrderedPeople}
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
      </Column>
      <Column w={4} className="is-hidden-mobile">
        <SideBar>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find faculty..."
          />
          <Collapsible title="Type filter" height="auto">
            <TypesFilter handleClick={handleClick} />
          </Collapsible>
        </SideBar>
      </Column>
    </Columns>
  )
}

PeopleSearch.defaultProps = {
  showLabLink: true,
}

export default PeopleSearch
