import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PublicationYears from "../components/publicationyears"
import Pagination from "../components/pagination"
import SearchBar from "../components/searchbar"
import YearsFilter from "../components/yearsfilter"
import Collapsible from "../components/collapsible"

const EMPTY_QUERY = ""

const toMap = (people) => {
  let ret = new Map()

  people.forEach(({node}) => {
    const person = node

    ret.set(person.id, person)
  })

  return ret
}

const flatten = (publications) => {
  let ret = [];

  publications.forEach(({node}) => {
    const publication = node

    ret.push(publication)
  })

  return ret
}

const Publications = props => {
  const { data } = props
  const peopleMap = toMap(data.people.edges)


  console.log(peopleMap)

  const allPublications = flatten(data.publications.edges) //sort(flatten(data.publications.edges))
  //const [state, setState] = useState({query: emptyQuery})

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPublications, setFilteredPublications] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [yearsFilter, setYearsFilter] = useState(new Set())

  const handleInputChange = e => {  
    const q = e.target.value  
    const { data } = props

    let ret = []   
    
    for (let publication of allPublications) {
      if (publication.title.toLowerCase().includes(q.toLowerCase())) {
        ret.push(publication)
      }
    }

    // update state according to the latest query and results
    setQuery(q)
    setFilteredPublications(ret)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    console.log(currentPage)

    setPage(currentPage)
  }

  const handleClick = data => {
    setYearsFilter(data)
    setPage(1)
  }
  

  const hasSearchResults = query !== EMPTY_QUERY
  let publications = hasSearchResults ? filteredPublications : allPublications
  
  let yearFilteredPublications

  if (yearsFilter.size > 0) {
    yearFilteredPublications = publications.filter((publication) => {
      return yearsFilter.has(publication.year)
    })
  } else {
    yearFilteredPublications = publications
  }

  const offset = (page - 1) * recordsPerPage
  let pagedPublications = yearFilteredPublications.slice(offset, offset + recordsPerPage)
  
  console.log('slop', query, offset, page, recordsPerPage, pagedPublications.length, hasSearchResults)
  return (
    <Layout>
      <SEO title="Publications" />
      <h1>Publications</h1>

      <div className="columns">
        <div className="column is-one-third">
          <SearchBar handleInputChange={handleInputChange}/>
          <Collapsible title="Year filter" height="auto">
            <YearsFilter publications={publications} handleClick={handleClick} />
          </Collapsible>
        </div>
        <div className="column">
          <h2>{yearFilteredPublications.length} Found {yearFilteredPublications.length === 1 ? "publication" : "publications"} found</h2>
          <PublicationYears publications={pagedPublications} peopleMap={peopleMap} />

          <Pagination page={page} totalRecords={yearFilteredPublications.length} recordsPerPage={recordsPerPage} pageNeighbours={1} onPageChanged={onPageChanged} />
        </div>
      </div>
    </Layout>
  )
}

export default Publications

export const pageQuery = graphql`
  query {
    faculty: allFacultyJson {
      edges {
        node {
          labId
        }
      }
    }

    people: allPeopleJson {
      edges {
        node {
          labId
          id
          firstName
          lastName
          title
        }
      }
    }

    publications: allPublicationsJson(sort: {fields: [year, title], order: [DESC, ASC]}) {
      edges {
        node {
          authors {
            corresponding
            initials
            lastName
          }
          labId
          journal
          issue
          pages
          title
          volume
          year
        }
      }
    }
  }
`