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
import BlueLink from "./bluelink"
import TextLink from "./textlink"

const EMPTY_QUERY = ""

const LabSearch = ({ allLabs, peopleMap }) => {
  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredLabs, setFilteredLabs] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)

  const handleInputChange = e => {
    const q = e.target.value
    let ret = []

    for (let lab of allLabs) {
      if (lab.name.toLowerCase().includes(q.toLowerCase())) {
        ret.push(lab)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredLabs(ret)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let labs = hasSearchResults ? filteredLabs : allLabs

  const offset = (page - 1) * recordsPerPage
  let pagedLabs = labs.slice(offset, offset + recordsPerPage)

  return (
    <Columns>
      <SmallColumn>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find labs"
        />
      </SmallColumn>
      <MainColumn>
        <SearchSummary count={labs.length} single="Lab" plural="Labs" />

        {pagedLabs.map((lab, index) => {
          const person = peopleMap[lab.leaders[0]]

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
                    <TextLink to={`/research-areas/labs/${lab.id}`}>
                      {name}
                    </TextLink>
                  </h3>
                </Column>
                <Column w="1/2" style={{ borderLeft: "solid 1px lightgray" }}>
                  <MembersLink to={`/research-areas/labs/${lab.id}/members`} />
                  <PublicationsLink
                    to={`/research-areas/labs/${lab.id}/publications`}
                  />
                  <EmailLink to={person.frontmatter.email[0]} />
                </Column>
              </Columns>
            </div>
          )
        })}

        <Pagination
          page={page}
          totalRecords={labs.length}
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
