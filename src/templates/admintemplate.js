import React, { useState } from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import SiteSearch from "../components/search/sitesearch"
import Column from "../components/column"
import H1 from "../components/headings/h1"
import H2 from "../components/headings/h2"
import { Link } from "gatsby"
import generic from "../assets/svg/generic.svg"
import { personName } from "../utils/personname"
import ContactInfo from "../components/people/contactinfo"
import PersonLink from "../components/people/personlink"

const EMPTY_QUERY = ""

const AdminGrid = ({ people, peopleMap, cols }) => {
  console.log(people)

  const rows = Math.floor(people.length / cols) + 1

  const ret = []

  let pc = 0

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      let person = peopleMap[people[pc]]

      col.push(
        <Column w={3}>
          {pc < people.length && (
            <div className={`w-full shadow  mb-8 md:mx-4`}>
              <div>
                <PersonLink person={person} />
              </div>
              <ContactInfo person={person} />
            </div>
          )}
        </Column>
      )

      ++pc

      if (pc === people.length) {
        break
      }
    }

    ret.push(<Column className="justify-center">{col}</Column>)

    if (pc === people.length) {
      break
    }
  }

  return ret
}

AdminGrid.defaultProps = {
  cols: 4,
}

const StaffGroups = ({ allAdmin, peopleMap }) => {
  const ret = []

  for (let group of allAdmin) {
    ret.push(<H2>{group.name}</H2>)

    ret.push(<AdminGrid people={group.members} peopleMap={peopleMap} />)
  }

  return ret
}

const AdminTemplate = ({ pageContext }) => {
  const { allAdmin, peopleMap, crumbs } = pageContext

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
      crumbs={[
        ["People", "/people"],
        ["Administration", "/administration"],
      ]}
      title="Administration"
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

      <H1 className="text-center">Meet our Administration</H1>

      <div className="w-full">
        {/* <Labs labs={allGroups} /> */}
        {/*<StaffGrid labs={allGroups} /> */}
        <StaffGroups allAdmin={allAdmin} peopleMap={peopleMap} />
      </div>
    </CrumbContainerLayout>
  )
}

export default AdminTemplate
