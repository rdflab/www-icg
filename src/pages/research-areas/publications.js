import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Publication from "../../components/publication"
import Pagination from "../../components/pagination"

const EMPTY_QUERY = ""

const flatten = (publications) => {
  let ret = [];

  publications.forEach(({node}) => {
    const publication = node

    ret.push(publication)
  })

  return ret
}
/**
 * Sorts a list of publications by date desc and title asc
 * @param {*} publications 
 */
const sort = (publications) => {
  let dateMap = new Map()

  for (let publication of publications) {
    const { date, title } = publication

    if (!dateMap.has(date)) {
      dateMap.set(date, new Map())
    }

    dateMap.get(date).set(title, publication)
  }

  let ret = [];

  const dateKeys = Array.from(dateMap.keys()).sort().reverse()

  for (let date of dateKeys) {
    const titleKeys = Array.from(dateMap.get(date).keys()).sort()

    for (let title of titleKeys) {
      ret.push(dateMap.get(date).get(title))
    }
  }

  return ret
}

const Publications = props => {
  const { data } = props

  const allPublications = flatten(data.publications.edges) //sort(flatten(data.publications.edges))
  //const [state, setState] = useState({query: emptyQuery})

  const [query, setQuery] = useState(EMPTY_QUERY)
  const [filteredPublications, setFilteredPublications] = useState([])
  const [page, setPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(20)
  const [count, setCount] = useState(0);

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
    console.log('wobble', page)
    setFilteredPublications(ret)
    setPage(1)
  }

  const onPageChanged = data => {
    const { currentPage } = data
    console.log(currentPage)

    setPage(currentPage)
  }

  

  const hasSearchResults = filteredPublications.length > 0 // && query !== emptyQuery
  const publications = hasSearchResults ? filteredPublications : allPublications
  const offset = (page - 1) * recordsPerPage;
  const pagedPublications = publications.slice(offset, offset + recordsPerPage);
  
  console.log('slop', offset, page, recordsPerPage, filteredPublications.length, hasSearchResults)
  return (
    <Layout>
      <SEO title="Publications" />

      <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
         Click me
        </button>
    

      {/*in-line css for demo purposes*/}
      <h1 style={{ textAlign: `center` }}>Publications</h1>

      <input type="text" aria-label="Search" placeholder="Type to find publication..." onChange={handleInputChange} />

      <h2>{publications.length} Found {publications.length === 1 ? "publication" : "publications"} found</h2>

      {pagedPublications.map(publication => {
        return (
          <article>

            <Publication publication={publication} />
            <hr />
          </article>
        )
      })}

      <Pagination page={page} totalRecords={publications.length} recordsPerPage={recordsPerPage} pageNeighbours={1} onPageChanged={onPageChanged} />
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