import React, { useState } from "react"
import { graphql } from "gatsby"
import CrumbLayout from "../components/crumblayout"
import toImageMap from "../utils/toimagemap"
import PeopleSearchResults from "../components/people/peoplesearchresults"
import { PEOPLE_TYPES } from "../constants"
import toPeopleTypeMap from "../utils/peopletypemap"
import SearchBar from "../components/searchbar"
import TypesFilter from "../components/people/typesfilter"
import TypeSelector from "../components/people/typeselector"
import HideSmall from "../components/hidesmall"

const EMPTY_QUERY = ""

const FacultyAndStaffExtTemplate = ({ data, pageContext }) => {
  const { groupMap, allPeople } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPeople, setFilteredPeople] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [types, setTypes] = useState([])

  const imageMap = toImageMap(data.files)

  const handleInputChange = e => {
    const q = e.target.value
    let ret = []

    for (let person of allPeople) {
      const name = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`
      if (name.toLowerCase().includes(q.toLowerCase())) {
        ret.push(person)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredPeople(ret)
    setPage(1)
  }

  const handleClick = data => {
    setTypes(data[0] !== "All" ? data : [])
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let people = hasSearchResults ? filteredPeople : allPeople

  let typeFilteredPeople

  if (types.length > 0) {
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
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
      ]}
      title="Faculty and Staff"
      headerComponent={
        <HideSmall className="w-1/3">
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find faculty..."
            text={query}
          />
        </HideSmall>
      }
    >
      {/* <TypesFilter handleClick={handleClick} /> */}

      <SearchBar
        className="sm:hidden"
        handleInputChange={handleInputChange}
        placeholder="Type to find faculty..."
        text={query}
      />

      <TypeSelector onClick={handleClick} />

      <PeopleSearchResults
        people={typeFilteredPeople}
        pagedPeople={typeOrderedPeople}
        page={page}
        recordsPerPage={recordsPerPage}
        groupMap={groupMap}
        imageMap={imageMap}
        showLabLink={true}
        onPageChanged={onPageChanged}
      />
    </CrumbLayout>
  )
}

export default FacultyAndStaffExtTemplate

export const query = graphql`
  query {
    files: allFile(
      filter: {
        absolutePath: { regex: "/images/people/" }
        ext: { eq: ".jpg" }
      }
    ) {
      edges {
        node {
          name
          relativePath
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
