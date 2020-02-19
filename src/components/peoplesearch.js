import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"
import PeopleList from "./peoplelist"
import Pagination from "./pagination"
import SearchBar from "./searchbar"
import Collapsible from "./collapsible"
import SearchCount from "./searchcount"

const EMPTY_QUERY = ""

const PeopleSearch = ({labMap, allPeople, showLabLink }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPeople, setFilteredPeople] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)

  const handleInputChange = e => {  
    const q = e.target.value
    let ret = []   
    
    for (let people of allPeople) {
      if (people.firstName.toLowerCase().includes(q.toLowerCase()) || people.lastName.toLowerCase().includes(q.toLowerCase())) {
        ret.push(people)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredPeople(ret)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    console.log(currentPage)

    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let people = hasSearchResults ? filteredPeople : allPeople

  const offset = (page - 1) * recordsPerPage
  let pagedPeople = people.slice(offset, offset + recordsPerPage)
  
  return (
    <>
      <div className="columns">
        <div className="column is-one-third">
          <SearchBar handleInputChange={handleInputChange} placeholder="Type to find faculty..."/>
        </div>
        <div className="column">
          <div><SearchCount>{people.length}</SearchCount> Research Faculty and Staff found</div>
          <PeopleList people={pagedPeople} labMap={labMap} showLabLink={showLabLink} />

          <Pagination page={page} totalRecords={people.length} recordsPerPage={recordsPerPage} pageNeighbours={1} onPageChanged={onPageChanged} />
        </div>
      </div>
    </>
  )
}

PeopleSearch.defaultProps = {
  showLabLink: true
}

export default PeopleSearch