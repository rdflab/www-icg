import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PublicationYears from "../components/publicationyears"
import Pagination from "../components/pagination"
import SearchBar from "../components/searchbar"
import YearsFilter from "../components/yearsfilter"
import { Row, Col } from "react-bootstrap"

const EMPTY_QUERY = ""

const processFaculty = (faculty) => {
  let ret = new Map()

  faculty.forEach(({node}) => {
    const publication = node

    ret.set(node.labId, node)
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
  const facultyMap = processFaculty(data.faculty.edges)

  console.log(facultyMap)

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

      <Row>
        <Col xs={4}>
          <SearchBar handleInputChange={handleInputChange}/>

          <YearsFilter publications={publications} handleClick={handleClick} />
        </Col>
        <Col>
          <h2>{yearFilteredPublications.length} Found {yearFilteredPublications.length === 1 ? "publication" : "publications"} found</h2>
          <PublicationYears publications={pagedPublications} />

          <Pagination page={page} totalRecords={yearFilteredPublications.length} recordsPerPage={recordsPerPage} pageNeighbours={1} onPageChanged={onPageChanged} />
        </Col>
      </Row>
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