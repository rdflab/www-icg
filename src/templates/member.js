import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import CrumbLayout from "../components/crumblayout"
import Columns from "../components/columns"
import SideBar from "../components/sidebar/sidebar"
import SideBarMembers from "../components/people/sidebarmembers"
import SmallColumn from "../components/smallcolumn"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import BlueLink from "../components/bluelink"
import ContactInfo from "../components/people/contactinfo"
import HTMLDiv from "../components/htmldiv"
import SimplePubSearch from "../components/publication/simplepubsearch"

const interests = person => {
  const n = person.researchAreas.length

  let ret = []

  for (let i = 0; i < n; ++i) {
    const researchArea = person.researchAreas[i]

    ret.push(
      <BlueLink key={i} to={`/research-areas/${researchArea.id}`}>
        {researchArea.name}
      </BlueLink>
    )

    if (i < n - 1) {
      ret.push(", ")
    }
  }

  return <div>{ret}</div>
}

const MemberTemplate = ({ pageContext, data }) => {
  const {
    id,
    person,
    lab,
    labMap,
    labPeople,
    peopleMap,
    publications,
    researchAreasMap,
  } = pageContext

  const title = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
        [title, `/research-areas/faculty-and-staff/${person.frontmatter.id}`],
      ]}
      title={title}
    >
      <Columns>
        <SmallColumn>
          <h1 className="text-blue-columbia mb-4">
            {person.frontmatter.titles[0]}
          </h1>

          <ContactInfo person={person} />
        </SmallColumn>
        <MainColumn>
          {data.file !== null && (
            <div className="mb-8">
              <Img
                fluid={data.file.childImageSharp.fluid}
                style={{ width: "20rem" }}
                className="shadow-md rounded-md"
              />
            </div>
          )}

          <HTMLDiv html={person.html} />

          {publications.length > 0 && (
            <div className="mt-8">
              <h2>Publications</h2>

              <SimplePubSearch
                labMap={labMap}
                peopleMap={peopleMap}
                allPublications={publications}
                showLabLink={false}
              />
            </div>
          )}
        </MainColumn>
        <SideColumn>
          <SideBar>
            <h1 className="text-blue-columbia mb-4">
              {person.frontmatter.titles[0]}
            </h1>

            <ContactInfo person={person} />

            {person.frontmatter.researchAreas.length > 0 && (
              <div className="mt-4">
                <h2>Research Interests</h2>

                {interests(person, researchAreasMap)}
              </div>
            )}
          </SideBar>
          <SideBarMembers lab={lab} people={labPeople} />
        </SideColumn>
      </Columns>
    </CrumbLayout>
  )
}

export default MemberTemplate

export const query = graphql`
  query($id: String!) {
    file(absolutePath: { regex: "/images/people/" }, name: { eq: $id }) {
      relativePath
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
