import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Breadcrumb from "../../components/breadcrumb"

const FacultyIndex = props => {
  const { data } = props
  const allFaculty = data.faculty.edges
  const emptyQuery = ""
  const [state, setState] = React.useState({query: emptyQuery, filteredFaculty: []})

  const handleInputChange = event => {  
    const query = event.target.value  
    const { data } = props

    const faculty = allFaculty || []   
    // return all filtered posts  
    const filteredFaculty = faculty.filter(post => {    
      // destructure data from post frontmatter    
      const { labId } = post.node 
      return (      
        // standardize data with .toLowerCase()      
        // return true if the description, title or tags      
        // contains the query string      
        labId.toLowerCase().includes(query.toLowerCase())
      ) 
    })
      // update state according to the latest query and results  
    setState({ 
      query, // with current query string from the `Input` event    
      filteredFaculty: filteredFaculty, // with filtered data from posts.filter(post => (//filteredData)) above  
    })
  }

  const { filteredFaculty, query } = state
  const hasSearchResults = filteredFaculty && query !== emptyQuery
  const posts = hasSearchResults ? filteredFaculty : allFaculty

  return (
    <Layout>
      <SEO title="Labs" />

      <Breadcrumb crumbs={ [ ['For Research Scientists','/research-areas/labs'], ['iLottNum','test'] ] } />
    

      {/*in-line css for demo purposes*/}
      <h1>Research Labs</h1>

      <input type="text" aria-label="Search" placeholder="Type to find faculty member..." onChange={handleInputChange} />

      <h2>{posts.length} Faculty {posts.length === 1 ? "Member" : "Members"} found</h2>

      {posts.map(({ node }) => {
        const labId = node.labId

        return (
          <article key={labId}>
            <header>
              <h2>
                <Link to={`/research-areas/labs/${labId}`}>{labId}</Link>
              </h2>
              
            </header>
            {/* <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: description || excerpt,
                }}
              />
            </section> */}
            <hr />
          </article>
        )
      })}
    </Layout>
  )
}

export default FacultyIndex

export const pageQuery = graphql`
  query {
    faculty: allFacultyJson {
      edges {
        node {
          labId
        }
      }
    }
  }
`