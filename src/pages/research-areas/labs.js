import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import flattenEdges from "../../utils/flattenedges"
import toPeopleMap from "../../utils/topeoplemap"
import SearchBar from "../../components/searchbar"
import SearchCount from "../../components/searchcount"
import EmailLink from "../../components/emaillink"
import MembersLink from "../../components/memberslink"
import PublicationsLink from "../../components/publicationslink"

const EMPTY_QUERY = ""

const Labs = props => {
  const { data } = props
  const peopleMap = toPeopleMap(flattenEdges(data.people.edges))
  const allLabs = flattenEdges(data.labs.edges)

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
    <Layout
      crumbs={[
        ["Home", "/"],
        ["For Research Scientists", "/research-areas"],
        ["Labs", "/research-areas/labs"],
      ]}
    >
      <SEO title="Research Labs" />

      {/*in-line css for demo purposes*/}
      <h1>Research Labs</h1>

      <div className="columns">
        <div className="column is-4">
          <SearchBar
            handleInputChange={handleInputChange}
            placeholder="Type to find faculty..."
          />
        </div>
        <div className="column">
          <div style={{ paddingBottom: "1rem" }}>
            <SearchCount>{labs.length}</SearchCount> Faculty{" "}
            {labs.length === 1 ? "Member" : "Members"} found
          </div>

          {labs.map((lab, index) => {
            const person = peopleMap.get(lab.leaders[0])

            let name = person.firstName + " " + person.lastName

            if (person.postNominalLetters.length > 0) {
              name += ", " + person.postNominalLetters.join(" ")
            }

            return (
              <article
                key={index}
                style={{
                  paddingTop: "2rem",
                  paddingBottom: "2rem",
                  borderTop: "solid 2px rgba(0, 0, 128, 0.5)",
                }}
              >
                <main>
                  <div className="columns">
                    <div className="column is-7">
                      <h3>
                        <Link to={`/research-areas/labs/${lab.id}`}>
                          {name}
                        </Link>
                      </h3>
                    </div>
                    <div
                      className="column"
                      style={{ borderLeft: "solid 1px lightgray" }}
                    >
                      <MembersLink
                        to={`/research-areas/labs/${lab.id}/members`}
                      />
                      <PublicationsLink
                        to={`/research-areas/labs/${lab.id}/publications`}
                      />
                      <EmailLink to={person.email} />
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
    labs: allGroupsJson(filter: { type: { eq: "Lab" } }) {
      edges {
        node {
          id
          name
          leaders
          members
        }
      }
    }

    people: allPeopleJson {
      edges {
        node {
          groups
          id
          firstName
          lastName
          email
          titles
          postNominalLetters
          type
        }
      }
    }
  }
`
