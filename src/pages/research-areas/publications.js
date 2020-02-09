import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const flatten = (publications) => {
  let ret = [];

  publications.forEach(({node}) => {
    const { publications } = node

    if (publications !== null) {
      ret = ret.concat(publications)
    }
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

  const allPublications = data.publications.edges //sort(flatten(data.publications.edges))
  const emptyQuery = ""
  const [state, setState] = React.useState({query: emptyQuery, filteredPublications: []})

  const handleInputChange = event => {  
    const query = event.target.value  
    const { data } = props

    const publications = allPublications || []   
    // return all filtered posts  
    const filteredPublications = publications.filter(({ node }) => {
      const publication = node   
      // destructure data from post frontmatter    
      return (      
        // standardize data with .toLowerCase()      
        // return true if the description, title or tags      
        // contains the query string      
        publication.title.toLowerCase().includes(query.toLowerCase())
      ) 
    })
      // update state according to the latest query and results  
    setState({ 
      query, // with current query string from the `Input` event    
      filteredPublications: filteredPublications, // with filtered data from posts.filter(post => (//filteredData)) above  
    })
  }

  const { filteredPublications, query } = state
  const hasSearchResults = filteredPublications && query !== emptyQuery
  const publications = hasSearchResults ? filteredPublications : allPublications

  return (
    <Layout>
      <SEO title="Publications" />
    

      {/*in-line css for demo purposes*/}
      <h1 style={{ textAlign: `center` }}>Publications</h1>

      <input type="text" aria-label="Search" placeholder="Type to find publication..." onChange={handleInputChange} />

      <h2>{publications.length} Found {publications.length === 1 ? "publication" : "publications"} found</h2>

      {publications.map(({ node }) => {
        const publication = node
        console.log(publication)
        const title = publication.title

        return (
          <article>
            <header>
              <h2>
                cake {title}
              </h2>
              
            </header>
            <hr />
          </article>
        )
      })}
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