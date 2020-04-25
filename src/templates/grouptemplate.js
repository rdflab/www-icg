import React, { useState } from "react"
import { graphql } from "gatsby"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import toImageMap from "../utils/toimagemap"
import SearchBar from "../components/search/searchbar"
import SearchSummary from "../components/search/searchsummary"
import SiteSearch from "../components/search/sitesearch"
import PeopleList from "../components/people/peoplelist"
import Column from "../components/column"
import HideSmall from "../components/hidesmall"
import ShowSmall from "../components/showsmall"
import H1 from "../components/headings/h1"
// import MainColumn from "../components/maincolumn"
// import SideColumn from "../components/sidecolumn"

const EMPTY_QUERY = ""

const GroupTemplate = ({ data, pageContext }) => {
  const { title, crumbs, allPeople } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPeople, setFilteredPeople] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)

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

  const onPageChanged = data => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let people = hasSearchResults ? filteredPeople : allPeople

  const offset = (page - 1) * recordsPerPage
  //let pagedPeople = typeFilteredPeople.slice(offset, offset + recordsPerPage)

  console.log(imageMap)

  return (
    <CrumbContainerLayout
      crumbs={crumbs}
      title={title}
      headerComponent={<SiteSearch />}
      titleComponent={
        <SearchSummary count={people.length} single="Member" plural="Members" />
      }
    >
      {/* <TypesFilter handleClick={handleClick} /> */}

      <H1>{title}</H1>

      <ShowSmall>
        <SearchBar
          handleInputChange={handleInputChange}
          placeholder="Type to find people..."
          text={query}
        />
      </ShowSmall>

      <HideSmall>
        <Column isCentered={true} className="mb-8">
          <div className="w-1/2">
            <SearchBar
              handleInputChange={handleInputChange}
              placeholder="Type to find people..."
              text={query}
            />
          </div>
        </Column>
      </HideSmall>

      <PeopleList imageMap={imageMap} people={people} />
    </CrumbContainerLayout>
  )
}

export default GroupTemplate

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
