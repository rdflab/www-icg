import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
import SelectedPublications from "../components/publication/selectedpublications"
//import SideBar from "../components/sidebar/sidebar"
//import SideBarNews from "../components/news/sidebarnews"
import HTMLDiv from "../components/htmldiv"
import SiteSearch from "../components/search/sitesearch"
import Container from "../components/container"
import PeopleGroups from "../components/people/peoplegroups"
import Img from "gatsby-image"
import ShowSmall from "../components/showsmall"
import HideSmall from "../components/hidesmall"
import ShowBetween from "../components/showbetween"
import BackgroundImage from "gatsby-background-image"
import { graphql, Link } from "gatsby"
import FacultyHeader from "../components/faculty/facultyheader"
import Column from "../components/column"
import FullDiv from "../components/fulldiv"
import BlueLink from "../components/links/bluelink"
import pubmedsvg from "../assets/svg/pubmed.svg"
import ExtLink from "../components/links/extlink"
import BlueLinkExt from "../components/links/bluelinkext"
import SmallContainer from "../components/smallcontainer"
import DropShadowFrame from "../components/images/dropshadowframe"
import useSiteMetadata from "../hooks/sitemetadata"
import Button from "../components/button"

const PubMedLink = ({ person }) => (
  // <div className="uppercase">
  //   <ExtLink to={person.frontmatter.pubmed}>
  //     <img src={pubmedsvg} className="inline align-middle w-32" />
  //   </ExtLink>
  // </div>

  <Column isVCentered={true}>
    <Column className="uppercase mr-4 md:w-32">See more on</Column>
    <Column>
      <ExtLink
        to={person.frontmatter.pubmed}
        className="opacity-70 hover:opacity-100 trans-ani"
      >
        <img src={pubmedsvg} className="w-32" />
      </ExtLink>
    </Column>
  </Column>
)

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

const AppointmentsGrid = ({ appointments, cols, colWidth, headingColor }) => {
  const rows = Math.floor(appointments.length / cols) + 1

  const ret = []

  let pc = 0
  let index = 0
  let appointment = null
  let found = false

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      appointment = null

      if (pc < appointments.length) {
        appointment = appointments[pc++]
        found = true
      }

      col.push(
        <Column className={`md:${colWidth}`} key={index}>
          {appointment !== null && (
            <div className="mb-4">
              <h4>
                <BlueLinkExt to={appointment.url}>
                  {appointment.institute}
                </BlueLinkExt>
              </h4>
              <h5 className="text-gray-600">{appointment.title}</h5>
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

    if (pc === appointments.length) {
      break
    }
  }

  return <div>{ret}</div>
}

AppointmentsGrid.defaultProps = {
  cols: 2,
  colWidth: "w-9/20",
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
  <h2 className="uppercase mb-8 text-center" style={{ fontWeight: "normal" }}>
    {children}
  </h2>
)

const FacultyHeading2 = ({ children }) => (
  <h3 className="uppercase mb-8" style={{ fontWeight: "normal" }}>
    {children}
  </h3>
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
    <SmallContainer className="my-16 text-2xl">
      <div>{heading}</div>
      <div className="text-gray-600">{html}</div>
      <div className="mt-4">
        <BlueLink to="#about">Read more</BlueLink>
      </div>
    </SmallContainer>
  )
}

const About = ({ person, headshotFile, markdown }) => {
  let heading = null
  let html = null

  if (markdown !== null) {
    html = <HTMLDiv className="text-justify" html={markdown.html} />
  }

  return (
    <SmallContainer className="my-16 text-2xl">
      <FacultyHeading>About {person.frontmatter.name}</FacultyHeading>
      <Column>
        <Column className="mr-8">
          {headshotFile !== null && (
            <DropShadowFrame className="w-48 h-48 rounded-lg">
              <Img
                fluid={headshotFile.childImageSharp.fluid}
                className="w-full h-full"
              />
            </DropShadowFrame>
          )}
        </Column>
        <Column>
          <FullDiv>
            <div>{html}</div>
          </FullDiv>
        </Column>
      </Column>
    </SmallContainer>
  )
}

const Team = ({ labGroupMap }) => (
  <Container>
    <FacultyHeading>Meet The Team</FacultyHeading>

    <ShowSmall size="lg">
      <PeopleGroups
        groupMap={labGroupMap}
        cols={2}
        colWidth="w-9/20"
        showHeadings={false}
      />
    </ShowSmall>

    <ShowBetween s1="lg" s2="xl">
      <PeopleGroups
        groupMap={labGroupMap}
        cols={3}
        colWidth="w-3/10"
        showHeadings={false}
      />
    </ShowBetween>

    <HideSmall size="xl">
      <PeopleGroups groupMap={labGroupMap} showHeadings={false} />
    </HideSmall>

    {/* <PeopleGroups groupMap={labGroupMap} /> faculty={faculty} /> */}
  </Container>
)

const FacultyShortTemplate = ({ path, pageContext, data }) => {
  const {
    crumbs,
    person,
    cv,
    appointments,
    lab,
    publications,
    labNews,
  } = pageContext

  const { paths } = useSiteMetadata()

  let headshotImage = null

  if (data.file !== null) {
    headshotImage = (
      <DropShadowFrame className="w-96 rounded-lg">
        <Img
          fluid={data.file.childImageSharp.fluid}
          className="w-full h-full"
        />
      </DropShadowFrame>
    )
  }

  let headerImage = null
  let headerImageCredit = ""

  if (data.abstractMarkdown !== null) {
    headerImageCredit = data.abstractMarkdown.frontmatter.headerImageCredit
  }

  for (let { node } of data.files.edges) {
    const file = node

    if (file.relativePath.includes(person.frontmatter.id)) {
      headerImage = (
        <BackgroundSection file={file}>
          {headshotImage !== null && (
            <Container className="absolute bottom-0 mb-8 z-20">
              {headshotImage}
            </Container>
          )}

          {headerImageCredit !== "" && (
            <Container className="hidden md:block absolute bottom-0 right-0 text-sm text-white opacity-80 mb-8 z-10">
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

      <div className="py-16 bg-columbia-light-gray">
        <Team labGroupMap={lab.groupMap} />
      </div>

      {/* {appointments !== null && appointments.appointments.length > 0 && (
        <div className="py-16 bg-columbia-secondary-blue-10">
          <SmallContainer>
            <FacultyHeading>Appointments</FacultyHeading>
            <AppointmentsGrid appointments={appointments.appointments} />
          </SmallContainer>
        </div>
      )} */}

      <div id="about" />

      <div className="py-16">
        <About
          person={person}
          headshotFile={data.file}
          markdown={data.markdown}
        />
      </div>

      {appointments !== null && appointments.appointments.length > 0 && (
        <div className="py-16 bg-columbia-secondary-blue-10">
          <SmallContainer>
            <FacultyHeading2>Appointments</FacultyHeading2>
            <AppointmentsGrid appointments={appointments.appointments} />
          </SmallContainer>
        </div>
      )}

      {cv !== null && cv.awards.length > 0 && (
        <div className="py-8">
          <Container>
            <FacultyHeading2>Awards and Honors</FacultyHeading2>
            <AwardsGrid cv={cv} />
          </Container>
        </div>
      )}

      <div className="py-16 bg-columbia-light-gray">
        {person.frontmatter.tags.includes("publication-format:recent") &&
          publications.length > 0 && (
            <Container>
              <FacultyHeading2>Recent Publications</FacultyHeading2>

              <RecentPublications publications={publications} />
            </Container>
          )}

        {person.frontmatter.tags.includes("publication-format:selected") &&
          publications.length > 0 && (
            <Container>
              <FacultyHeading2>Selected Publications</FacultyHeading2>

              <SelectedPublications
                id={person.frontmatter.id}
                publications={publications}
              />
            </Container>
          )}

        <Container className="pt-8">
          <Column className="items-center justify-between">
            <PubMedLink person={person} />
            <Column>
              <Button
                to={`${paths.facultyPath}/${person.frontmatter.id}/publications`}
              >
                More Publications
              </Button>
            </Column>
          </Column>
        </Container>
      </div>

      {/* {labNews.length > 0 && (
          <div className="mt-8">
            <h3>News</h3>
            <SideBarNews allNews={labNews} />
          </div>
        )} */}
    </CrumbLayout>
  )
}

export default FacultyShortTemplate

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
