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
import BlueLink from "../components/links/bluelink"

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
      height: "36rem",
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
  <div className="uppercase mb-8 text-3xl tracking-wide text-center">
    {children}
  </div>
)

const FacultyHeading2 = ({ children }) => (
  <div className="uppercase mb-8 text-2xl tracking-wide">{children}</div>
)

const Quote = ({ text }) => (
  <p className="text-justify">
    <span
      className="text-blue-500 mr-1"
      style={{ fontFamily: "Playfair Display", fontSize: "150%" }}
    >
      &ldquo;
    </span>
    {text}
    <span
      className="text-blue-500 ml-1"
      style={{ fontFamily: "Playfair Display", fontSize: "150%" }}
    >
      &rdquo;
    </span>
  </p>
)

const Abstract = ({ person, markdown }) => {
  let heading = null
  let html = null

  if (markdown !== null) {
    heading = (
      <div className="text-3xl font-semibold mb-2">
        <Quote text={markdown.frontmatter.title} />
      </div>
    )
    html = <HTMLDiv className="text-justify" html={markdown.html} />
  } else {
    heading = <FacultyHeading2>About {person.frontmatter.name}</FacultyHeading2>
  }

  return (
    <Container>
      <div className="mx-4 lg:mx-40 my-16 text-2xl">
        <div>{heading}</div>
        <div>{html}</div>
        <div className="mt-4">
          <BlueLink to="#about">Read more</BlueLink>
        </div>
      </div>
    </Container>
  )
}

const About = ({ person, markdown }) => {
  let heading = null
  let html = null

  if (markdown !== null) {
    html = <HTMLDiv className="text-justify" html={markdown.html} />
  }

  return (
    <Container>
      <div className="mx-4 lg:mx-40 my-16 text-2xl">
        <div>
          <FacultyHeading>About {person.frontmatter.name}</FacultyHeading>
        </div>
        <div>{html}</div>
      </div>
    </Container>
  )
}

const Team = ({ labGroupMap }) => (
  <Container>
    <FacultyHeading2>Meet The Team</FacultyHeading2>

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
  let headerImageCredit = ""

  if (data.abstractMarkdown !== null) {
    headerImageCredit = data.abstractMarkdown.frontmatter.headerImageCredit
  }

  for (let { node } of data.files.edges) {
    const file = node

    if (file.relativePath.includes(id)) {
      headerImage = (
        <BackgroundSection file={file}>
          {headshotImage !== null && (
            <Container className="absolute bottom-0 mb-8">
              {headshotImage}
            </Container>
          )}

          {headerImageCredit !== "" && (
            <Container className="absolute bottom-0 right-0 text-sm text-white opacity-80 mb-8">
              {headerImageCredit}
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

      <Abstract person={person} markdown={data.abstractMarkdown} />

      <div className="py-8 bg-columbia-light-gray">
        <Team labGroupMap={labGroupMap} />
      </div>

      <div id="about" />

      <div className="py-8">
        <About person={person} markdown={data.markdown} />
      </div>

      {cv !== null && cv.awards.length > 0 && (
        <div className="py-8">
          <Container>
            <FacultyHeading2>Awards and Honors</FacultyHeading2>
            <AwardsGrid cv={cv} />
          </Container>
        </div>
      )}

      {labPublications.length > 0 && (
        <div className="py-8 bg-columbia-light-gray">
          <Container>
            <FacultyHeading2>Recent Publications</FacultyHeading2>

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

    abstractMarkdown: markdownRemark(
      fileAbsolutePath: { regex: "/faculty-abstracts/" }
      frontmatter: { id: { eq: $id } }
    ) {
      id
      html
      frontmatter {
        title
        headerImageCredit
      }
      excerpt(format: HTML)
    }

    markdown: markdownRemark(
      fileAbsolutePath: { regex: "/faculty/" }
      frontmatter: { id: { eq: $id } }
    ) {
      id
      html
      frontmatter {
        title
      }
      excerpt(format: HTML)
    }
  }
`
