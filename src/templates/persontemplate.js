import React from "react"
import { graphql, Link } from "gatsby"
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

import bgsvg from "../assets/svg/name-bg.svg"
import Container from "../components/container"
import { personName } from "../utils/personname"
import WhiteLink from "../components/whitelink"
import H1 from "../components/headings/h1"
import H2 from "../components/headings/h2"

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

const interests2 = person => {
  const n = person.researchAreas.length

  let ret = []

  //ret.push(<div className="mr-4">Research Interests</div>)

  for (let i = 0; i < n; ++i) {
    const researchArea = person.researchAreas[i]

    ret.push(
      <Link key={i} to={`/research-areas/${researchArea.id}`}>
        <div className="rounded-full text-center bg-gray-100 border border-solid border-gray-300 px-4 py-2 mr-2">
          {researchArea.name}
        </div>
      </Link>
    )
  }

  return (
    <>
      <Heading>Research Interests</Heading>
      <Column className="items-center">{ret}</Column>
    </>
  )
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

const Heading = ({ children, className }) => (
  <H1 className={`text-center pt-8  ${className}`}>{children}</H1>
)

const Items = ({ title, items }) => (
  // <SectionBreak>
  //   <Collapsible title={title} height="auto" headerClassName="text-blue-700">
  <>
    <Column>
      <Column w={2} className="pr-8">
        <div className="row items-center justify-end h-16 w-full">
          <div>
            <h3 className="text-blue-600">{title}</h3>
          </div>
        </div>
      </Column>

      <Column w={10} className="bg-white shadow p-8">
        <div className="w-full">
          {items.map((item, index) => (
            <Column key={index}>
              <Column w={2} className="font-semibold justify-end mr-4">
                {item.year !== "n/a" && item.year}
              </Column>
              <Column w={10} className="ml-4 ">
                {item.title}
              </Column>
            </Column>
          ))}
        </div>
      </Column>
    </Column>
  </>
)

const ResearchInterests = ({ person, researchAreasMap }) => (
  <div className="mt-8">
    <H1>Research Interests</H1>

    {interests(person, researchAreasMap)}
  </div>
)

const Groups = ({ groups }) => (
  <div className="mt-4">
    <WhiteLink to={labUrl(groups[0])}>
      {labName(groups[0].leaders[0])}
    </WhiteLink>
  </div>
)

const PersonTemplate = ({ pageContext, data }) => {
  const {
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
        ["People", "/people"],
        [title, personUrl(person)],
      ]}
      headerComponent={<SiteSearch />}
    >
      <HideSmall className="relative w-full mb-16">
        <Column className="w-full h-full absolute bg-white ">
          <Column className="w-6/10 bg-gray-100 p-8 px-32"></Column>
          <Column className="w-4/10 bg-blue-columbia-60 p-8 text-white"></Column>
        </Column>
        <Container className="z-20 relative">
          <Column>
            <MainColumn className="w-6/10 py-8">
              <div>
                <div className="uppercase mb-4">People</div>
                <div className="text-4xl font-semibold">
                  {personName(person)}
                </div>
                <div className="text-2xl">{person.frontmatter.titles[0]}</div>
              </div>
            </MainColumn>
            <SideColumn className="py-8 text-white">
              <div>
                <div className="uppercase mb-4">Contact</div>
                <ContactInfo person={person} />

                {groups.length > 0 && <Groups groups={groups} />}
              </div>
            </SideColumn>
          </Column>
        </Container>
      </HideSmall>

      <Container>
        {/* {interests2(person)} */}

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

        <Heading>About {personName(person)}</Heading>

        {cv !== null && cv.education.length > 0 && (
          <div className="mb-8">
            <Education cv={cv} />
          </div>
        )}

        {cv !== null && cv.awards.length > 0 && (
          <div className="mb-8">
            <Awards cv={cv} />
          </div>
        )}

        {cv !== null && cv.training.length > 0 && (
          <div className="mb-8">
            <Training cv={cv} />
          </div>
        )}

        {cv !== null && cv.experience.length > 0 && (
          <div className="mb-8">
            <Experience cv={cv} />
          </div>
        )}

        {publications.length > 0 && (
          <>
            <Heading className="text-center mt-32">Publications</Heading>
            <div>
              <SimplePubSearch
                allPublications={publications}
                showLabLink={false}
                sectionMode="alt"
              />
            </div>
          </>
        )}
      </Container>
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
