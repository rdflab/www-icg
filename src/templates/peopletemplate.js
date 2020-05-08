import React, { useState } from "react"
import { graphql } from "gatsby"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import toImageMap from "../utils/toimagemap"
import PeopleSearchResults from "../components/people/peoplesearchresults"
import { PEOPLE_TYPES, GROUPS } from "../constants"
import toPeopleGroupMap from "../utils/peoplegroupmap"
import SearchBar from "../components/search/searchbar"
//import TypesFilter from "../components/people/typesfilter"
import TypeSelector from "../components/people/typeselector"
import HideSmall from "../components/hidesmall"
import SearchSummary from "../components/search/searchsummary"
import SiteSearch from "../components/search/sitesearch"
import Column from "../components/column"
import ShowSmall from "../components/showsmall"
import H1 from "../components/headings/h1"
import PeopleGroups from "../components/people/peoplegroups"
// import MainColumn from "../components/maincolumn"
// import SideColumn from "../components/sidecolumn"

const EMPTY_QUERY = ""

const PeopleTemplate = ({ data, pageContext }) => {
  const { title, crumbs, allPeople, groupMap } = pageContext

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

  //const groupMap = toPeopleGroupMap(typeFilteredPeople)

  const filteredGroupMap = toPeopleGroupMap(typeFilteredPeople)

  var c = 0
  let typeOrderedPeople = []
  // extract number of records
  for (let g of GROUPS) {
    const gp = groupMap[g]

    for (let person of gp) {
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
    <CrumbContainerLayout
      crumbs={crumbs}
      title={title}
      headerComponent={<SiteSearch />}
      // titleComponent={
      //   <SearchSummary
      //     count={typeFilteredPeople.length}
      //     single="Member"
      //     plural="Members"
      //   />
      // }
    >
      {/* <H1>{title}</H1> */}

      <ShowSmall>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find faculty..."
          text={query}
        />
      </ShowSmall>

      <HideSmall>
        <Column isCentered={true} className="mb-8">
          <div className="w-1/2">
            <SearchBar
              handleInputChange={handleInputChange}
              placeholder="Type to find faculty..."
              text={query}
            />
          </div>
        </Column>
      </HideSmall>

      {/* <Column>
      <MainColumn>
        <div className="w-full"> */}
      {/* <HideSmall>
        <Column isVCentered={true} className="justify-center mt-8">
          <div>
            <TypeSelector onClick={handleClick} />
          </div>
        </Column>
      </HideSmall> */}

      {/* <PeopleSearchResults
        people={typeFilteredPeople}
        pagedPeople={typeOrderedPeople}
        page={page}
        recordsPerPage={recordsPerPage}
        imageMap={imageMap}
        showLabLink={true}
        onPageChanged={onPageChanged}
      /> */}

      <PeopleGroups groupMap={filteredGroupMap} />

      {/* </div>
      </MainColumn>
      <SideColumn></SideColumn>
      </Column> */}
    </CrumbContainerLayout>
  )
}

export default PeopleTemplate

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
