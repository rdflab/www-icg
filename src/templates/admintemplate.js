import React, { useState } from "react"
import CrumbLayout from "../components/crumblayout"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"
import PeopleGroups from "../components/people/peoplegroups"
import Container from "../components/container"

const EMPTY_QUERY = ""

const AdminTemplate = ({ pageContext }) => {
  const { adminGroupMap } = pageContext

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
    <CrumbLayout
      crumbs={[
        ["People", "/people"],
        ["Administration", "/people/administration"],
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
      <div className="bg-gray-700 py-16">
        <Container>
          <H1 className="text-white">Meet our Administration Team</H1>

          <div className="w-full">
            <PeopleGroups
              groupMap={adminGroupMap}
              headingColor="text-gray-100"
            />
          </div>
        </Container>
      </div>
    </CrumbLayout>
  )
}

export default AdminTemplate
