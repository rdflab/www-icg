import React, { useState } from "react"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import { GROUPS } from "../constants"
import toPeopleGroupMap from "../utils/peoplegroupmap"
import SearchBar from "../components/search/searchbar"
//import TypesFilter from "../components/people/typesfilter"
import HideSmall from "../components/hidesmall"
import SiteSearch from "../components/search/sitesearch"
import Column from "../components/column"
import ShowSmall from "../components/showsmall"
import PeopleGroups from "../components/people/peoplegroups"
import Container from "../components/container"
import ShowBetween from "../components/showbetween"

const EMPTY_QUERY = ""

const PeopleTemplate = ({ path, pageContext }) => {
  const { nav, title, crumbs, allPeople, groupMap } = pageContext

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPeople, setFilteredPeople] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [types, setTypes] = useState([])

  const handleInputChange = (e) => {
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

  const handleClick = (data) => {
    setTypes(data[0] !== "All" ? data : [])
    setPage(1)
  }

  const onPageChanged = (data) => {
    const { currentPage } = data
    setPage(currentPage)
  }

  const hasSearchResults = query !== EMPTY_QUERY
  let people = hasSearchResults ? filteredPeople : allPeople

  let typeFilteredPeople

  if (types.length > 0) {
    typeFilteredPeople = people.filter((person) => {
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

  console.log(groupMap)

  var c = 0
  let typeOrderedPeople = []
  // extract number of records
  for (let g of GROUPS) {
    console.log(g, g in groupMap)
    if (g in groupMap) {
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
  }

  return (
    <CrumbTitleLayout
      path={path}
      crumbs={crumbs}
      nav={nav}
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
      <div className="py-8">
        <Container>
          {/* <ShowSmall>
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
          </HideSmall> */}

          <ShowSmall size="lg">
            <PeopleGroups groupMap={groupMap} cols={2} colWidth="w-9/20" />
          </ShowSmall>

          <ShowBetween s1="lg" s2="xl">
            <PeopleGroups groupMap={groupMap} cols={3} colWidth="w-3/10" />
          </ShowBetween>

          <HideSmall size="xl">
            <PeopleGroups groupMap={groupMap} />
          </HideSmall>
        </Container>
      </div>
    </CrumbTitleLayout>
  )
}

export default PeopleTemplate

// export const query = graphql`
//   query {
//     files: allFile(
//       filter: {
//         absolutePath: { regex: "/images/people/" }
//         ext: { eq: ".jpg" }
//       }
//     ) {
//       edges {
//         node {
//           name
//           relativePath
//           childImageSharp {
//             fluid(maxWidth: 500) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `
