import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import CrumbLayout from "../components/crumblayout"
import Column from "../components/column"
import BlueLink from "../components/links/bluelink"
import HTMLDiv from "../components/htmldiv"
import SimplePubSearch from "../components/publication/simplepubsearch"
import SiteSearch from "../components/search/sitesearch"

import { personUrl } from "../utils/urls"

import Container from "../components/container"
import H1 from "../components/headings/h1"
import PersonHeader from "../components/people/personheader"
import Share from "../components/share/share"
import ShareLinks from "../components/share/sharelinks"
import FlHdDiv from "../components/flhddiv"
//import Breadcrumb from "../components/breadcrumb2"
import ContactInfo from "../components/people/contactinfo"
import CrumbTitleLayout from "../components/crumbtitlelayout"
import Card from "../components/card"

const interests = (person) => {
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

// const interests2 = person => {
//   const n = person.researchAreas.length

//   let ret = []

//   //ret.push(<div className="mr-4">Research Interests</div>)

//   for (let i = 0; i < n; ++i) {
//     const researchArea = person.researchAreas[i]

//     ret.push(
//       <Link key={i} to={`/research-areas/${researchArea.id}`}>
//         <div className="rounded-full text-center bg-gray-100 border border-solid border-gray-300 px-4 py-2 mr-2">
//           {researchArea.name}
//         </div>
//       </Link>
//     )
//   }

//   return (
//     <>
//       <Heading>Research Interests</Heading>
//       <Column className="items-center">{ret}</Column>
//     </>
//   )
// }

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
    <h2 className="mb-2">{title}</h2>

    {items.map((item, index) => (
      <Column key={index} className="mb-4">
        <Column className="w-2/12 justify-end text-blue-500 mr-8">
          {item.year !== "n/a" && <h4>{item.year}</h4>}
        </Column>
        <Column className="w-10/12">
          <h4>{item.title}</h4>
        </Column>
      </Column>
    ))}
  </>
)

// const ResearchInterests = ({ person, researchAreasMap }) => (
//   <div className="mt-8">
//     <H1>Research Interests</H1>

//     {interests(person, researchAreasMap)}
//   </div>
// )

// const Groups = ({ groups }) => (
//   <div className="mt-4">
//     <WhiteLink to={labUrl(groups[0])}>
//       {labName(groups[0].leaders[0])}
//     </WhiteLink>
//   </div>
// )

const PersonTemplate = ({ path, pageContext, data }) => {
  const { person, publications, cv } = pageContext

  const title = `${person.frontmatter.firstName} ${person.frontmatter.lastName}`

  return (
    <CrumbTitleLayout
      path={path}
      crumbs={[
        ["People", "/people"],
        [person.frontmatter.name, path],
      ]}
      title={person.frontmatter.name}
      headerContent={<SiteSearch />}
      crumbContent={<ShareLinks path={path} />}
    >
      {/* {interests2(person)} */}

      <FlHdDiv>
        <Container></Container>
        <Container className="my-8">
          <div className="mr-8">
            {data.file !== null && (
              <Img
                fluid={data.file.childImageSharp.fluid}
                style={{ width: "20rem" }}
                className="block rounded-lg shadow-lg hover:shadow-xl trans-ani"
              />
            )}
          </div>

          <div className="p-4 w-full">
            <HTMLDiv html={person.html} />
          </div>
        </Container>
        <div className="bg-columbia-secondary-blue py-8">
          <Container>
            <div className="uppercase text-white text-lg">Contact</div>
            <div className="text-white text-lg">
              <ContactInfo person={person} color="white" />
            </div>
          </Container>
        </div>

        {/* <Heading>About {personName(person)}</Heading> */}

        {/* {cv !== null && cv.education.length > 0 && (
        <div className="py-8">
          <Container>
            <Education cv={cv} />
          </Container>
        </div>
      )}

      {cv !== null && cv.awards.length > 0 && (
        <div className="py-8">
          <Container>
            <Awards cv={cv} />
          </Container>
        </div>
      )}

      {cv !== null && cv.training.length > 0 && (
        <div className="py-8">
          <Container>
            <Training cv={cv} />
          </Container>
        </div>
      )}

      {cv !== null && cv.experience.length > 0 && (
        <div className="py-8">
          <Container>
            <Experience cv={cv} />
          </Container>
        </div>
      )} */}

        {publications.length > 0 && (
          <div className="bg-columbia-light-gray py-16">
            <Container>
              <Heading className="text-center">Publications</Heading>
              <div>
                <SimplePubSearch
                  allPublications={publications}
                  showLabLink={false}
                  sectionMode="alt"
                />
              </div>
            </Container>
          </div>
        )}
      </FlHdDiv>
    </CrumbTitleLayout>
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
