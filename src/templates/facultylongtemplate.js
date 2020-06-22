import React from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
import SelectedPublications from "../components/publication/selectedpublications"

import HTMLDiv from "../components/htmldiv"
import SiteSearch from "../components/search/sitesearch"
import Container from "../components/container"
import Img from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import { graphql } from "gatsby"
import FacultyHeader from "../components/faculty/facultyheader"
import Column from "../components/column"
import FullDiv from "../components/fulldiv"
import BlueIndexLink from "../components/links/blueindexlink"
import BlueLinkExt from "../components/links/bluelinkext"
import SmallContainer from "../components/smallcontainer"
import DropShadowFrame from "../components/images/dropshadowframe"
import headersvg from "../assets/svg/header.svg"
import ShareLinks from "../components/share/sharelinks"
import { PubMedLink, HeadShotImage, Team } from "./facultyshorttemplate"
import Breadcrumb from "../components/breadcrumb2"

const AwardsGrid = ({ cv, cols, colWidth, headingColor }) => {
  const rows = Math.floor(cv.awards.length / cols) + 1

  const ret = []

  let pc = 0
  let index = 0
  let award = null

  for (let r = 0; r < rows; ++r) {
    const col = []

    for (let c = 0; c < cols; ++c) {
      award = null

      if (pc < cv.awards.length) {
        award = cv.awards[pc++]
      }

      col.push(
        <Column className={`md:${colWidth}`} key={index}>
          {award !== null && (
            <div className="mb-4">
              <h4 className="text-blue">{award.title}</h4>
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
  cols: 2,
  colWidth: "w-9/20",
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
      height: "42rem",
      backgroundPosition: "top center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      overflow: "hidden",
    }}
  >
    {children}
  </BackgroundImage>
)

// const GenericBackgroundSection = ({ children }) => (
//   <div
//     className="relative w-full overflow-hidden"
//     style={{
//       backgroundImage: `url(${headersvg})`,
//       height: "36rem",
//       backgroundPosition: "top center",
//       backgroundRepeat: "no-repeat",
//       backgroundSize: "cover",
//     }}
//   >
//     {children}
//   </div>
// )

const GenericBackgroundSection = ({ file, children }) => (
  <BackgroundImage
    fluid={file.childImageSharp.fluid}
    style={{
      width: "100%",
      height: "42rem",
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
  if (markdown !== null) {
    return (
      <SmallContainer className="my-16 text-2xl">
        <div className="text-3xl font-semibold mb-2">
          <Quote text={markdown.frontmatter.title} />
        </div>
        <div className="text-gray-600">
          <HTMLDiv className="text-justify" html={markdown.html} />
        </div>
        <div className="mt-4">
          <BlueIndexLink to="#about">Read more</BlueIndexLink>
        </div>
      </SmallContainer>
    )
  } else {
    return <div />
  }
}

const About = ({ person, headshotFile, markdown }) => {
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
            <DropShadowFrame className="w-48 h-48 rounded-lg opacity-90 hover:opacity-100">
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

const FacultyLongTemplate = ({ path, pageContext, data }) => {
  const {
    crumbs,
    person,
    cv,
    appointments,
    lab,
    publications,
    news,
  } = pageContext

  const headshotImage = (
    <DropShadowFrame className="w-96 rounded-lg">
      <HeadShotImage data={data} person={person} />
    </DropShadowFrame>
  )

  let headerImage = (
    <img src={headersvg} className="w-full" alt={person.frontmatter.name} />
  )

  let headerImageCredit = ""

  if (data.abstractMarkdown !== null) {
    headerImageCredit = data.abstractMarkdown.frontmatter.headerImageCredit
  }

  let headerFile = null

  for (let { node } of data.files.edges) {
    if (node.relativePath.includes(person.frontmatter.id)) {
      headerFile = node
      break
    }
  }

  if (headerFile !== null) {
    headerImage = (
      <BackgroundSection file={headerFile}>
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
  } else {
    headerImage = (
      <GenericBackgroundSection file={data.genericHeaderFile}>
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
      </GenericBackgroundSection>
    )
  }

  return (
    <CrumbLayout
      path={path}
      nav="Faculty"
      title={person.frontmatter.name}
      crumbs={crumbs}
      headerComponent={<SiteSearch />}
      menuComponent={<ShareLinks path={path} />}
      headerFloat={true}
    >
      {headerImage !== null && headerImage}

      <FacultyHeader person={person} />

      {/* <Container className="m-8">
        <ShareLinks path={path} color="color" opacity={[40, 100]} />
      </Container> */}

      <Container>
        <Breadcrumb crumbs={crumbs} />
      </Container>

      <Abstract person={person} markdown={data.abstractMarkdown} />

      {Object.keys(lab.groupMap).length > 0 && (
        <div className="py-16 bg-columbia-light-gray">
          <Team labGroupMap={lab.groupMap} />
        </div>
      )}

      {/* {appointments !== null && appointments.appointments.length > 0 && (
        <div className="py-16">
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

      {person.frontmatter.tags.includes("appointments::show") &&
        appointments !== null &&
        appointments.appointments.length > 0 && (
          <div className="py-16 bg-columbia-secondary-blue-10">
            <SmallContainer>
              <FacultyHeading2>Appointments</FacultyHeading2>
              <AppointmentsGrid appointments={appointments.appointments} />
            </SmallContainer>
          </div>
        )}

      {person.frontmatter.tags.includes("awards-honors::show") &&
        cv !== null &&
        cv.awards.length > 0 && (
          <div className="py-16">
            <SmallContainer>
              <FacultyHeading2>Awards and Honors</FacultyHeading2>
              <AwardsGrid cv={cv} />
            </SmallContainer>
          </div>
        )}

      <div className="py-16 bg-columbia-light-gray">
        <Container>
          {person.frontmatter.tags.includes("publication-format::recent") &&
            publications.length > 0 && (
              <>
                <FacultyHeading2>Selected Publications</FacultyHeading2>

                <RecentPublications publications={publications} />
                <PubMedLink person={person} />
              </>
            )}

          {person.frontmatter.tags.includes("publication-format::selected") &&
            publications.length > 0 && (
              <>
                <FacultyHeading2>Selected Publications</FacultyHeading2>

                <SelectedPublications
                  id={person.frontmatter.id}
                  publications={publications}
                />
                <PubMedLink person={person} />
              </>
            )}

          {/* <Column className="items-center justify-between pt-8">
            <PubMedLink person={person} />
            {/* <Column>
              <Button
                to={`${paths.facultyPath}/${person.frontmatter.id}/publications`}
              >
                More Publications
              </Button>
            </Column>
          </Column> */}
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

export default FacultyLongTemplate

export const query = graphql`
  query($id: String!) {
    files: allFile(
      filter: {
        absolutePath: { regex: "/images/faculty/" }
        ext: { regex: "/jpg/" }
      }
    ) {
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

    genericHeaderFile: file(name: { eq: "generic-header" }) {
      relativePath
      childImageSharp {
        fluid(quality: 90, maxWidth: 1920) {
          ...GatsbyImageSharpFluid_withWebp
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
