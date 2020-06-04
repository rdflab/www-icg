import React from "react"
import CrumbLayout from "../components/crumblayout"
import CrumbTitleLayout from "../components/crumbtitlelayout"

import RecentPublications from "../components/publication/recentpublications"
//import SideBar from "../components/sidebar/sidebar"
import SideBarNews from "../components/news/sidebarnews"
import HTMLDiv from "../components/htmldiv"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"
import Container from "../components/container"
import PeopleGroups from "../components/people/peoplegroups"
import Img from "gatsby-image"
import ShowSmall from "../components/showsmall"
import HideSmall from "../components/hidesmall"
import ShowBetween from "../components/showbetween"
import BackgroundImage from "gatsby-background-image"
import { graphql } from "gatsby"
import styled from "styled-components"
import FacultyHeader from "../components/faculty/facultyheader"
import Column from "../components/column"
import FullDiv from "../components/fulldiv"

const AwardsGrid = ({ cv, cols, colWidth, headingColor }) => {
  const rows = Math.floor(cv.awards.length / cols) + 1

  const ret = []

  let pc = 0
  let index = 0
  let award = null
  let found = false

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      award = null

      if (pc < cv.awards.length) {
        award = cv.awards[pc++]
        found = true
      }

      col.push(
        <Column className={`md:${colWidth}`} key={index}>
          {award !== null && (
            <div className="mb-4">
              <h4 className="text-blue-600">{award.title}</h4>
              <h5 className="text-gray-600">{award.year}</h5>
            </div>
          )}
        </Column>
      )

      ++index
    }

    if (col.length > 0) {
      ret.push(
        <Column className="justify-between" key={r}>
          {col}
        </Column>
      )
    }

    if (pc === cv.awards.length) {
      break
    }
  }

  return <div>{ret}</div>
}

AwardsGrid.defaultProps = {
  cols: 3,
  colWidth: "w-3/10",
  headingColor: "text-columbia-secondary-blue",
}

const BackgroundSection = ({ file, children }) => (
  <BackgroundImage
    fluid={file.childImageSharp.fluid}
    style={{
      width: "100%",
      height: "32rem",
      backgroundPosition: "top center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      overflow: "hidden",
    }}
  >
    {children}
  </BackgroundImage>
)

const FacultyHeading = ({ children }) => (
  <div className="uppercase text-center mb-8 text-2xl tracking-wide">
    {children}
  </div>
)

const FacultyTemplate = ({ path, pageContext, data }) => {
  const {
    id,
    person,
    cv,
    lab,
    crumbs,
    labGroupMap,
    labPublications,
    labNews,
    html,
    excerptHtml,
  } = pageContext

  let headshotImage = null

  if (data.file !== null) {
    headshotImage = (
      <div className="w-96 block bg-white shadow-lg hover:shadow-xl trans-ani overflow-hidden rounded-lg">
        <Img
          fluid={data.file.childImageSharp.fluid}
          className="w-full h-full"
        />
      </div>
    )
  }

  let headerImage = null

  console.log(data)

  for (let { node } of data.files.edges) {
    console.log(node)
    const file = node

    if (file.relativePath.includes(id)) {
      headerImage = (
        <BackgroundSection file={file}>
          {headshotImage !== null && (
            <Container className="absolute bottom-0 mb-4">
              {headshotImage}
            </Container>
          )}
        </BackgroundSection>
      )
      break
    }
  }

  return (
    <CrumbLayout
      nav="Faculty"
      title={person.frontmatter.name}
      crumbs={crumbs}
      headerComponent={<SiteSearch />}
      headerLinksFloat={true}
      show
    >
      {headerImage !== null && headerImage}

      <FacultyHeader person={person} />

      <div>
        {html !== "" && (
          <Container>
            <div className="mx-32 my-16 text-2xl">
              <FacultyHeading>About {person.frontmatter.name}</FacultyHeading>
              <HTMLDiv html={html} />
            </div>
          </Container>
        )}

        {cv !== null && cv.awards.length > 0 && (
          <div className="py-8 bg-columbia-light-gray">
            <FacultyHeading>Awards and Honors</FacultyHeading>
            <Container>
              <AwardsGrid cv={cv} />
            </Container>
          </div>
        )}

        <div className="py-8">
          <Container>
            <FacultyHeading>Meet The Team</FacultyHeading>

            <ShowSmall size="lg">
              <PeopleGroups groupMap={labGroupMap} cols={2} colWidth="w-9/20" />
            </ShowSmall>

            <ShowBetween s1="lg" s2="xl">
              <PeopleGroups groupMap={labGroupMap} cols={3} colWidth="w-3/10" />
            </ShowBetween>

            <HideSmall size="xl">
              <PeopleGroups groupMap={labGroupMap} />
            </HideSmall>

            {/* <PeopleGroups groupMap={labGroupMap} /> faculty={faculty} /> */}
          </Container>
        </div>

        {labPublications.length > 0 && (
          <div className="py-8 bg-columbia-light-gray">
            <Container>
              <FacultyHeading>Recent Publications</FacultyHeading>

              <RecentPublications lab={lab} publications={labPublications} />
            </Container>
          </div>
        )}

        {/* {labNews.length > 0 && (
          <div className="mt-8">
            <h3>News</h3>
            <SideBarNews allNews={labNews} />
          </div>
        )} */}
      </div>
    </CrumbLayout>
  )
}

export default FacultyTemplate

export const query = graphql`
  query($id: String!) {
    files: allFile(filter: { absolutePath: { regex: "/images/faculty/" } }) {
      edges {
        node {
          relativePath
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }

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
