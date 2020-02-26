import React, { useState } from "react"
import Pagination from "./pagination"
import SearchBar from "./searchbar"
import SearchCount from "./searchcount"
import SearchSummary from "./searchsummary"
import EmailLink from "./emaillink"
import MembersLink from "./memberslink"
import PublicationsLink from "./publication/publicationslink"
import Columns from "./columns"
import Column from "./column"
import SideBar from "./sidebar/sidebar"
import BodyLink from "./bodylink"
import H4 from "./h4"
import styled from "styled-components"

const StyledLab = styled.article`
  padding-top: 1rem;
  padding-bottom: 2rem;
  border-top: solid 1px lightgray;
`

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
      <Column w={4} className="is-hidden-tablet">
        <SideBar>
          <p>Search by name:</p>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find labs"
          />
        </SideBar>
      </Column>
      <Column>
        <SearchSummary>
          <SearchCount>{labs.length}</SearchCount>{" "}
          {labs.length === 1 ? "Lab" : "Labs"} found
        </SearchSummary>

        {pagedLabs.map((lab, index) => {
          const person = peopleMap[lab.leaders[0]]

          let name = person.firstName + " " + person.lastName

          if (person.postNominalLetters.length > 0) {
            name += ", " + person.postNominalLetters.join(" ")
          }

          return (
            <StyledLab>
              <Columns>
                <Column w={7}>
                  <H4>
                    <BodyLink to={`/research-areas/labs/${lab.id}`}>
                      {name}
                    </BodyLink>
                  </H4>
                </Column>
                <Column style={{ borderLeft: "solid 1px lightgray" }}>
                  <MembersLink to={`/research-areas/labs/${lab.id}/members`} />
                  <PublicationsLink
                    to={`/research-areas/labs/${lab.id}/publications`}
                  />
                  <EmailLink to={person.email} />
                </Column>
              </Columns>
            </StyledLab>
          )
        })}

        <Pagination
          page={page}
          totalRecords={labs.length}
          recordsPerPage={recordsPerPage}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />
      </Column>
      <Column w={4} className="is-hidden-mobile">
        <SideBar>
          <p>Search by name:</p>
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find labs"
          />
        </SideBar>
      </Column>
    </Columns>
  )
}

export default LabSearch
