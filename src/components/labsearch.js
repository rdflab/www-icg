import React, { useState } from "react"
import Pagination from "./pagination"
import SearchBar from "./searchbar"
import SearchSummary from "./searchsummary"
import EmailLink from "./emaillink"
import MembersLink from "./memberslink"
import PublicationsLink from "./publication/publicationslink"
import Columns from "./columns"
import Column from "./column"
//import SideBar from "./sidebar/sidebar"
import SmallColumn from "./smallcolumn"
import SideColumn from "./sidecolumn"
import MainColumn from "./maincolumn"
import TextLink from "./textlink"

const EMPTY_QUERY = ""

const LabSearch = ({ allGroups, peopleMap }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredGroups, setFilteredGroups] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)

  const handleInputChange = e => {
    const q = e.target.value
    let ret = []

    for (let group of allGroups) {
      if (group.name.toLowerCase().includes(q.toLowerCase())) {
        ret.push(group)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredGroups(ret)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let groups = hasSearchResults ? filteredGroups : allGroups

  const offset = (page - 1) * recordsPerPage
  let pagedGroups = groups.slice(offset, offset + recordsPerPage)

  return (
    <Columns>
      <SmallColumn>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find labs..."
        />
      </SmallColumn>
      <MainColumn>
        <SearchSummary count={groups.length} single="Lab" plural="Labs" />

        {pagedGroups.map((group, index) => {
          const person = peopleMap[group.leaders[0]]

          let name =
            person.frontmatter.firstName + " " + person.frontmatter.lastName

          if (person.frontmatter.letters.length > 0) {
            name += ", " + person.frontmatter.letters.join(" ")
          }

          return (
            <div
              className="pt-4 pb-8 border-t border-solid border-gray-300"
              key={index}
            >
              <Columns>
                <Column w="1/2">
                  <h3>
                    <TextLink to={`/research-areas/labs/${group.id}`}>
                      {name}
                    </TextLink>
                  </h3>
                </Column>
                <Column w="1/2" style={{ borderLeft: "solid 1px lightgray" }}>
                  <MembersLink
                    to={`/research-areas/labs/${group.id}/members`}
                  />
                  <PublicationsLink
                    to={`/research-areas/labs/${group.id}/publications`}
                  />
                  <EmailLink to={person.frontmatter.email[0]} />
                </Column>
              </Columns>
            </div>
          )
        })}

        <Pagination
          page={page}
          totalRecords={groups.length}
          recordsPerPage={recordsPerPage}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />
      </MainColumn>
      <SideColumn>
        {/* <SideBar> */}
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find labs"
        />
        {/* </SideBar> */}
      </SideColumn>
    </Columns>
  )
}

export default LabSearch
