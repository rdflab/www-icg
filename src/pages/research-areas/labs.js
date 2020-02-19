import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Breadcrumb from "../../components/breadcrumb"
import flattenEdges from "../../utils/flattenedges"
import toPeopleMap from "../../utils/topeoplemap"
import toLabMap from "../../utils/tolabmap"
import SearchBar from "../../components/searchbar"
import { MdLibraryBooks, MdPeople, MdEmail } from 'react-icons/md';

const EMPTY_QUERY = ""

const Labs = props => {
  const { data } = props
  const peopleMap = toPeopleMap(flattenEdges(data.people.edges))
  const allLabs = flattenEdges(data.labs.edges)
  const labMap = toLabMap(peopleMap)

  
  const [query, setQuery] = React.useState(EMPTY_QUERY)
  const [filteredLabs, setFilteredLabs] = React.useState([])

  const handleInputChange = event => {  
    const q = event.target.value  
    const { data } = props

    const labs = allLabs || []   
    // return all filtered posts  
    const filteredLabs = labs.filter(lab => {
      return (      
        // standardize data with .toLowerCase()      
        // return true if the description, title or tags      
        // contains the query string      
        lab.id.toLowerCase().includes(q.toLowerCase())
      ) 
    })

    setQuery(q)
    setFilteredLabs(filteredLabs)
  }

  const hasSearchResults = filteredLabs.length > 0 || query !== EMPTY_QUERY
  const labs = hasSearchResults ? filteredLabs : allLabs

  return (
    <Layout>
      <SEO title="Research Labs" />

      <Breadcrumb crumbs={ [ ['For Research Scientists','/research-areas/labs'], ['Labs','/research-areas/labsest'] ] } />
    

      {/*in-line css for demo purposes*/}
      <h1>Research Labs</h1>
      
      <div className="columns">
        <div className="column is-one-third">
          <SearchBar handleInputChange={handleInputChange} placeholder="Type to find faculty..." />
        </div>
        <div className="column">
          <div style={{paddingBottom: "1rem"}}><span style={{color: "rgba(0, 0, 255, 1)"}}>{labs.length}</span> Faculty {labs.length === 1 ? "Member" : "Members"} found</div>

          {labs.map((lab, index) => {
            const person = peopleMap.get(lab.faculty)

            let name = person.firstName + ' ' + person.lastName

            if (person.postNominalLetters.length > 0) {
              name += ', ' + person.postNominalLetters.join(' ')
            }


            return (
              <article key={index} style={{paddingTop: "2rem", paddingBottom: "2rem", borderTop: "solid 2px rgba(0, 0, 128, 0.5)"}}>
                <main>
                  <div className="columns">
                    <div className="column is-two-thirds">
                    <h3>
                      <Link to={`/research-areas/labs/${lab.id}`}>{name}</Link>
                    </h3>
                    </div>
                    <div className="column" style={{borderLeft: "solid 1px lightgray"}}>
                      <div><MdPeople/><Link to={`/research-areas/labs/${lab.id}/members`}>View Lab Members</Link></div>
                      <div><MdLibraryBooks/><Link to={`/research-areas/labs/${lab.id}/publications`}>View Publications</Link></div>
                      <div><MdEmail/><a href={`mailto:${person.email}`}>{person.email}</a></div>
                    </div>
                  </div>
                </main>
              </article>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Labs

export const pageQuery = graphql`
  query {
    labs: allLabsJson {
      edges {
        node {
          id
          name
          faculty
        }
      }
    }

    people: allPeopleJson {
      edges {
        node {
          labs
          id
          firstName
          lastName
          email
          titles
          postNominalLetters
          tags
        }
      }
    }
  }
`