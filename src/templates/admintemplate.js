import React, { useState } from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"
import H2 from "../components/headings/h2"
import PeopleGrid from "../components/people/peoplegrid"

const EMPTY_QUERY = ""

const StaffGroups = ({ allAdmin, peopleMap }) => {
  const ret = []

  for (let group of allAdmin) {
    ret.push(
      <div className="mb-8">
        <H2>{group.name}</H2>
        <PeopleGrid people={group.members} peopleMap={peopleMap} cols={3} />
      </div>
    )
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

      <H1 className="text-center">Meet our Administration Team</H1>

      <div className="w-full">
        {/* <Labs labs={allGroups} /> */}
        {/*<StaffGrid labs={allGroups} /> */}
        <StaffGroups allAdmin={allAdmin} peopleMap={peopleMap} />
      </div>
    </CrumbContainerLayout>
  )
}

export default AdminTemplate
