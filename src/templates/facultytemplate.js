import React, { useState } from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import SiteSearch from "../components/search/sitesearch"
import Column from "../components/column"
import H1 from "../components/headings/h1"
import H2 from "../components/headings/h2"
import { Link } from "gatsby"
import generic from "../assets/svg/generic.svg"

const EMPTY_QUERY = ""

export const labUrl = person => {
  return `/research-areas/labs/${person.labId}`
}

const Lab = ({ person, labId }) => {
  const [hover, setHover] = useState(false)

  const onMouseEnter = e => {
    setHover(true)
  }

  const onMouseLeave = e => {
    setHover(false)
  }

  return (
    <div
      className={`w-full rounded bg-white shadow-md overflow-hidden mb-8 md:mx-4`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to={`/research-areas/labs/${labId}`}>
        <div className="bg-white">
          <img src={generic} className="w-full" alt={person.frontmatter.name} />
        </div>
        <div
          className={`p-4 text-lg trans-ani ${
            hover ? "bg-blue-600 text-white" : "text-blue-500"
          }`}
        >
          {person.frontmatter.name}, {person.frontmatter.postNominalLetters}
        </div>
      </Link>
    </div>
  )
}

const StaffGrid = ({ people, peopleMap, cols }) => {
  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      let person = peopleMap[people[pc].id]

      col.push(
        <Column className="md:w-1/4" key={`person-${pc}`}>
          {pc < people.length && (
            <Lab person={person} labId={people[pc].labId} />
          )}
        </Column>
      )

      ++pc

      if (pc === people.length) {
        break
      }
    }

    ret.push(
      <Column className="justify-center" key={r}>
        {col}
      </Column>
    )

    if (pc === people.length) {
      break
    }
  }

  return ret
}

StaffGrid.defaultProps = {
  cols: 4,
}

const StaffGroups = ({ allGroups, peopleMap }) => {
  const ret = []

  for (let group of allGroups) {
    ret.push(<H2 key={`header-${group.name}`}>{group.name}</H2>)

    ret.push(
      <StaffGrid
        people={group.faculty}
        peopleMap={peopleMap}
        key={group.name}
      />
    )
  }

  return ret
}

const FacultyTemplate = ({ pageContext }) => {
  const { allGroups, peopleMap, crumbs } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredGroups, setFilteredGroups] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)

  // const handleInputChange = e => {
  //   const q = e.target.value.toLowerCase()
  //   let ret = []

  //   // for (let group of allGroups) {
  //   //   if (group.frontmatter.name.toLowerCase().includes(q)) {
  //   //     ret.push(group)
  //   //   }
  //   // }

  //   // update state according to the latest query and results
  //   setQuery(q)
  //   setFilteredGroups(ret)
  //   setPage(1)
  // }

  // const onPageChanged = data => {
  //   const { currentPage } = data
  //   setPage(currentPage)
  // }

  // const hasSearchResults = query !== EMPTY_QUERY
  // let groups = hasSearchResults ? filteredGroups : allGroups

  // const offset = (page - 1) * recordsPerPage
  // let pagedGroups = groups.slice(offset, offset + recordsPerPage)

  return (
    <CrumbContainerLayout
      crumbs={crumbs}
      title="Research Labs"
      headerComponent={<SiteSearch />}
      // titleComponent={
      //   <SearchSummary count={groups.length} single="Lab" plural="Labs" />
      // }
    >
      {/* <SearchBar
        handleInputChange={handleInputChange}
        placeholder="Type to find labs"
        text={query}
        className="my-4"
      /> */}

      <H1 className="text-center">Meet our Scientists</H1>

      <div className="w-full">
        {/* <Labs labs={allGroups} /> */}
        {/*<StaffGrid labs={allGroups} /> */}
        <StaffGroups allGroups={allGroups} peopleMap={peopleMap} />
      </div>
    </CrumbContainerLayout>
  )
}

export default FacultyTemplate
