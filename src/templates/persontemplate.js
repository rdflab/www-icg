import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import CrumbLayout from "../components/crumblayout"
import Column from "../components/column"
import SideBarMembers from "../components/people/sidebarmembers"
import SmallColumn from "../components/smallcolumn"
import MainColumn from "../components/maincolumn"
import SideColumn from "../components/sidecolumn"
import BlueLink from "../components/bluelink"
import ContactInfo from "../components/people/contactinfo"
import HTMLDiv from "../components/htmldiv"
import SimplePubSearch from "../components/publication/simplepubsearch"
import SiteSearch from "../components/search/sitesearch"

import Collapsible from "../components/collapsible"
import SectionBreak from "../components/sectionbreak"
import FlatCard from "../components/flatcard"
import Title from "../components/title"
import { labName } from "./labtemplate"
import { labUrl, personUrl, labMembersUrl } from "../utils/urls"
import HideSmall from "../components/hidesmall"

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

const Education = ({ cv }) => (
  <Items title="Education" items={cv.education} />
  // <SectionBreak>
  //   <Collapsible title="Education" height="auto">
  //     <div>
  //       {/* <h2>Education</h2> */}
  //       {cv.education.map((item, index) => (
  //         <div key={index} className="mb-2">
  //           {item.year !== "n/a" && (
  //             <div className="text-blue-600">{item.year}</div>
  //           )}
  //           <div>{item.title}</div>
  //         </div>
  //       ))}
  //     </div>
  //   </Collapsible>
  // </SectionBreak>
)

const Experience = ({ cv }) => (
  <Items title="Experience" items={cv.experience} />
  // <div>
  //   <h2>Experience</h2>
  //   {cv.experience.map((item, index) => (
  //     <div key={index} className="mb-2">
  //     {item.year !== "n/a" && <div className="text-blue-500">{item.year}</div>}
  //     <div>{item.title}</div>
  //     </div>
  //   ))}
  // </div>
)

const Training = ({ cv }) => <Items title="Training" items={cv.training} />

const Awards = ({ cv }) => <Items title="Awards and Honors" items={cv.awards} />

const Items = ({ title, items }) => (
  <SectionBreak>
    <Collapsible title={title} height="auto" headerClassName="text-blue-700">
      <div>
        {/* <h2>{title}</h2> */}
        {items.map((item, index) => (
          <Column key={index} className="mb-4">
            <Column w="2" className="text-gray-600 text-right mr-4">
              {item.year !== "n/a" && item.year}
            </Column>
            <Column w="10">{item.title}</Column>
          </Column>
        ))}
      </div>
    </Collapsible>
  </SectionBreak>
)

const ResearchInterests = ({ person, researchAreasMap }) => (
  <div className="mt-8">
    <h2>Research Interests</h2>

    {interests(person, researchAreasMap)}
  </div>
)

const Groups = ({ groups }) => (
  <div>
    <h2 className="mt-8">Lab</h2>
    <div>
      <BlueLink to={labUrl(groups[0])}>
        {labName(groups[0].leaders[0])}
      </BlueLink>
    </div>
  </div>
)

const PersonTemplate = ({ pageContext, data }) => {
  const {
    id,
    person,
    groups,
    labPeople,
    publications,
    researchAreasMap,
    cv,
  } = pageContext

  const title = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`

  return (
    <CrumbLayout
      crumbs={[
        ["Home", "/"],
        ["Research Areas", "/research-areas"],
        ["Faculty and Staff", "/research-areas/faculty-and-staff"],
        [title, personUrl(person)],
      ]}
      headerComponent={<SiteSearch />}
    >
      <Column>
        <SmallColumn>
          <Title>{title}</Title>

          <h1 className="text-blue-columbia mb-4">
            {person.frontmatter.titles[0]}
          </h1>

          <ContactInfo person={person} />
        </SmallColumn>
        <MainColumn>
          <div>
            <HideSmall>
              <Title>{title}</Title>
            </HideSmall>

            {data.file !== null && (
              <div className="mb-8">
                <Img
                  fluid={data.file.childImageSharp.fluid}
                  style={{ width: "20rem" }}
                  className="shadow-md rounded-md mx-auto sm:mx-0"
                />
              </div>
            )}

            <HTMLDiv html={person.html} />

            {cv !== null && cv.education.length > 0 && <Education cv={cv} />}

            {cv !== null && cv.training.length > 0 && <Training cv={cv} />}

            {cv !== null && cv.experience.length > 0 && <Experience cv={cv} />}

            {cv !== null && cv.awards.length > 0 && <Awards cv={cv} />}

            {publications.length > 0 && (
              <SectionBreak>
                <Collapsible
                  title="Publications"
                  height="auto"
                  headerClassName="text-blue-700"
                >
                  <SimplePubSearch
                    allPublications={publications}
                    showLabLink={false}
                    sectionMode="alt"
                  />
                </Collapsible>
              </SectionBreak>
            )}
          </div>
        </MainColumn>
        <SideColumn>
          {/* <SideBar> */}

          <FlatCard>
            <h1 className="text-blue-columbia mb-4">
              {person.frontmatter.titles[0]}
            </h1>

            <ContactInfo person={person} />
          </FlatCard>

          <div className="mx-2">
            {person.frontmatter.researchAreas.length > 0 && (
              <ResearchInterests
                person={person}
                researchAreasMap={researchAreasMap}
              />
            )}

            {groups.length > 0 && <Groups groups={groups} />}

            {/* </SideBar> */}
            <div className="mt-8">
              <SideBarMembers
                group={groups[0]}
                people={labPeople}
                maxRecords={5}
              />

              <div className="mt-2">
                <BlueLink to={labMembersUrl(groups[0])}>More</BlueLink>
              </div>
            </div>
          </div>
        </SideColumn>
      </Column>
    </CrumbLayout>
  )
}

export default PersonTemplate

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
