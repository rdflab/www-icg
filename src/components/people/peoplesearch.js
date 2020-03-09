import React, { useState } from "react"
import SearchBar from "../search/searchbar"
import TypesFilter from "./typesfilter"
import Collapsible from "../collapsible"
import toPeopleTypeMap from "../../utils/peopletypemap"
import { PEOPLE_TYPES } from "../../constants"
//import SideBar from "../sidebar/sidebar"
import Columns from "../columns"
import SmallColumn from "../smallcolumn"
import MainColumn from "../maincolumn"
import SideColumn from "../sidecolumn"
import PeopleSearchResults from "./peoplesearchresults"

const EMPTY_QUERY = ""

const PeopleSearch = ({ groupMap, allPeople, showLabLink, imageMap }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPeople, setFilteredPeople] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [types, setTypes] = useState(new Set())

  const handleInputChange = e => {
    const q = e.target.value
    let ret = []

    for (let person of allPeople) {
      if (
        person.frontmatter.firstName.toLowerCase().includes(q.toLowerCase()) ||
        person.frontmatter.lastName.toLowerCase().includes(q.toLowerCase())
      ) {
        ret.push(person)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredPeople(ret)
    setPage(1)
  }

  const handleClick = data => {
    setTypes(data)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let people = hasSearchResults ? filteredPeople : allPeople

  let typeFilteredPeople

  if (types.size > 0) {
    typeFilteredPeople = people.filter(person => {
      let keep = false

      for (let type of types) {
        if (person.frontmatter.type.includes(type)) {
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
      <SmallColumn>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find faculty..."
        />
      </SmallColumn>
      <MainColumn>
        <PeopleSearchResults
          people={typeFilteredPeople}
          pagedPeople={typeOrderedPeople}
          page={page}
          recordsPerPage={recordsPerPage}
          groupMap={groupMap}
          imageMap={imageMap}
          showLabLink={showLabLink}
          onPageChanged={onPageChanged}
        />
      </MainColumn>
      <SideColumn>
        {/* <SideBar> */}
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find faculty..."
        />
        <Collapsible title="Filter By" height="auto">
          <TypesFilter handleClick={handleClick} />
        </Collapsible>
        {/* </SideBar> */}
      </SideColumn>
    </Columns>
  )
}

PeopleSearch.defaultProps = {
  showLabLink: true,
  imageMap: {},
}

export default PeopleSearch
