import React, { useState } from "react"
import CrumbLayout from "../components/crumblayout"

import RecentPublications from "../components/publication/recentpublications"
import SelectedPublications from "../components/publication/selectedpublications"
//import SideBar from "../components/sidebar/sidebar"
//import SideBarNews from "../components/news/sidebarnews"
import HTMLDiv from "../components/htmldiv"
import SiteSearch from "../components/search/sitesearch"
import Container from "../components/container"
import PeopleGroups from "../components/people/peoplegroups"
import ShowSmall from "../components/showsmall"
import HideSmall from "../components/hidesmall"
import ShowBetween from "../components/showbetween"
import BackgroundImage from "gatsby-background-image"
import { graphql } from "gatsby"
import FacultyHeader from "../components/faculty/facultyheader"
import Column from "../components/column"
import FullDiv from "../components/fulldiv"
import pubmedsvg from "../assets/svg/pubmed.svg"
import LinkExt from "../components/links/linkext"
import BlueLinkExt from "../components/links/bluelinkext"
import SmallContainer from "../components/smallcontainer"
import DropShadowFrame from "../components/images/dropshadowframe"
import ShareLinks from "../components/share/sharelinks"
//import Breadcrumb from "../components/breadcrumb2"
import Card from "../components/card"
import ZoomImage from "../components/images/zoomimage"
import H1 from "../components/headings/h1"

export const PubMedLink = ({ person }) => (
  // <div className="uppercase">
  //   <LinkExt to={person.frontmatter.pubmed}>
  //     <img src={pubmedsvg} className="inline align-middle w-32" />
  //   </LinkExt>
  // </div>

  <Column isVCentered={true}>
    <Column className="uppercase mr-4 md:w-32 my-2">See more on</Column>
    <Column>
      <LinkExt
        to={person.frontmatter.pubmed}
        className="opacity-70 hover:opacity-100 trans-ani"
      >
        <img src={pubmedsvg} className="w-32" />
      </LinkExt>
    </Column>
  </Column>
)

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

export const BackgroundSection = ({ file, children }) => (
  <BackgroundImage
    fluid={file.childImageSharp.fluid}
    style={{
      width: "100%",
      height: "40rem",
      backgroundPosition: "top center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      overflow: "hidden",
    }}
  >
    {children}
  </BackgroundImage>
)

export const GenericBackgroundSection = ({ file, children }) => (
  <BackgroundImage
    fluid={file.childImageSharp.fluid}
    style={{
      width: "100%",
      height: "40rem",
      backgroundPosition: "top center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      overflow: "hidden",
    }}
  >
    {children}
  </BackgroundImage>
)

export const FacultyHeading = ({ children }) => (
  <h1 className="mb-8 text-center">{children}</h1>
)

export const FacultyHeading2 = ({ children }) => (
  <h2 className="mb-8">{children}</h2>
)

export const Quote = ({ text }) => (
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

// const Abstract = ({ person, markdown }) => {
//   let heading = null
//   let html = null

//   if (markdown !== null) {
//     heading = (
//       <div className="text-3xl font-semibold mb-2">
//         <Quote text={markdown.frontmatter.title} />
//       </div>
//     )
//     html = <HTMLDiv className="text-justify" html={markdown.html} />
//   } else {
//     heading = <FacultyHeading2>About {person.frontmatter.name}</FacultyHeading2>
//   }

//   return (
//     <SmallContainer className="my-16 text-2xl">
//       <div>{heading}</div>
//       <div className="text-gray-600">{html}</div>
//       <div className="mt-4">
//         <BlueLink to="#about">Read more</BlueLink>
//       </div>
//     </SmallContainer>
//   )
// }

const About = ({ person, headshotFile, markdown }) => {
  let html = null

  if (markdown !== null) {
    html = <HTMLDiv className="text-justify" html={markdown.html} />
  }

  return (
    <SmallContainer className="text-2xl">
      {/* <FacultyHeading>About {person.frontmatter.name}</FacultyHeading> */}
      <Column>
        {/* <Column className="mr-8">
          {headshotFile !== null && (
            <DropShadowFrame className="w-48 h-48 rounded-lg">
              <Img
                fluid={headshotFile.childImageSharp.fluid}
                className="w-full h-full"
              />
            </DropShadowFrame>
          )}
        </Column> */}
        <Column>
          <FullDiv>
            <div>{html}</div>
          </FullDiv>
        </Column>
      </Column>
    </SmallContainer>
  )
}

export const Team = ({ labGroupMap }) => (
  <Container>
    <FacultyHeading>Meet The Team</FacultyHeading>

    <ShowSmall size="lg">
      <PeopleGroups
        groupMap={labGroupMap}
        cols={2}
        colWidth="w-9/20"
        showHeadings={false}
        showUrl={false}
        showCard={false}
      />
    </ShowSmall>

    <ShowBetween s1="lg" s2="xl">
      <PeopleGroups
        groupMap={labGroupMap}
        cols={3}
        colWidth="w-3/10"
        showHeadings={false}
        showUrl={false}
        showCard={false}
      />
    </ShowBetween>

    <ShowBetween s1="xl" s2="2xl">
      <PeopleGroups
        groupMap={labGroupMap}
        cols={4}
        colWidth="w-11/50"
        showHeadings={false}
        showUrl={false}
        showCard={false}
      />
    </ShowBetween>

    <HideSmall size="2xl">
      <PeopleGroups
        groupMap={labGroupMap}
        showHeadings={false}
        showUrl={false}
        showCard={false}
      />
    </HideSmall>

    {/* <PeopleGroups groupMap={labGroupMap} /> faculty={faculty} /> */}
  </Container>
)

export const HeadShotImage = ({ data, person }) => {
  return (
    <Card>
      <ZoomImage
        fluid={
          data.file !== null
            ? data.file.childImageSharp.fluid
            : data.generic.childImageSharp.fluid
        }
      />
    </Card>
  )
}

const FacultyShortTemplate = ({ path, pageContext, data }) => {
  const {
    crumbs,
    person,
    cv,
    appointments,
    lab,
    publications,
    news,
  } = pageContext

  let headerImage = null
  let headerImageCredit = ""

  const headshotImage = (
    <DropShadowFrame className="w-96">
      <HeadShotImage data={data} person={person} />
    </DropShadowFrame>
  )

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
      crumbs={crumbs}
      title={person.frontmatter.name}
      headerContent={<SiteSearch />}
      crumbContent={<ShareLinks path={path} />}
      floatMode="header"
    >
      {headerImage !== null && headerImage}

      <FacultyHeader person={person} />
      {/* 
      <Container className="m-8">
        <ShareLinks path={path} color="color" opacity={[40, 100]} />
      </Container> */}

      {/* <Container>
        <Breadcrumb crumbs={crumbs} />
      </Container> */}

      <div className="py-24 bg-white">
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

      {Object.keys(lab.groupMap).length > 0 && (
        <div className="py-16 bg-columbia-light-gray">
          <Team labGroupMap={lab.groupMap} />
        </div>
      )}

      {/* {appointments !== null && appointments.appointments.length > 0 && (
        <div className="py-16 bg-columbia-secondary-blue-10">
          <SmallContainer>
            <FacultyHeading>Appointments</FacultyHeading>
            <AppointmentsGrid appointments={appointments.appointments} />
          </SmallContainer>
        </div>
      )} */}
      {/* 
      <div id="about" />

      {cv !== null && cv.awards.length > 0 && (
        <div className="py-8">
          <SmallContainer>
            <FacultyHeading2>Awards and Honors</FacultyHeading2>
            <AwardsGrid cv={cv} />
          </SmallContainer>
        </div>
      )} */}

      <div className="py-24">
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
          {/* 
          <Column className="items-center justify-between pt-8">
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

export default FacultyShortTemplate

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

    file(absolutePath: { regex: "/images/people/" }, name: { eq: $id }) {
      relativePath
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    generic: file(absolutePath: { regex: "/generic.png/" }) {
      relativePath
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
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
