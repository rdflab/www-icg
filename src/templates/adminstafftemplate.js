import React, { useState } from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import SiteSearch from "../components/search/sitesearch"
import PeopleGroups from "../components/people/peoplegroups"
import Container from "../components/container"
import ShowSmall from "../components/showsmall"
import ShowBetween from "../components/showbetween"
import HideSmall from "../components/hidesmall"
import { useWindowSize } from "@react-hook/window-size"
import ShareLinks from "../components/share/sharelinks"

const EMPTY_QUERY = ""

const AdminStaffTemplate = ({ path, pageContext }) => {
  const { admin, crumbs } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredGroups, setFilteredGroups] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)

  const [width, height] = useWindowSize()

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
    <CrumbTitleLayout
      path={path}
      crumbs={crumbs}
      nav="Administration"
      title="Administration Team"
      headerComponent={<SiteSearch />}
      menuComponent={<ShareLinks path={path} />}
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

      <div className="my-8">
        <Container>
          <ShowSmall size="lg">
            <PeopleGroups
              groupMap={admin.groupMap}
              cols={2}
              showPhoto={true}
              colWidth="w-9/20"
              context="admin"
            />
          </ShowSmall>

          <ShowBetween s1="lg" s2="xl">
            <PeopleGroups
              groupMap={admin.groupMap}
              cols={3}
              showPhoto={true}
              colWidth="w-3/10"
              context="admin"
            />
          </ShowBetween>

          <ShowBetween s1="xl" s2="2xl">
            <PeopleGroups
              groupMap={admin.groupMap}
              showPhoto={true}
              context="admin"
              cols={4}
              colWidth="w-11/50"
            />
          </ShowBetween>

          <HideSmall size="2xl">
            <PeopleGroups
              groupMap={admin.groupMap}
              showPhoto={true}
              context="admin"
              cols={5}
              colWidth="w-19/100"
            />
          </HideSmall>
        </Container>
      </div>
    </CrumbTitleLayout>
  )
}

export default AdminStaffTemplate
