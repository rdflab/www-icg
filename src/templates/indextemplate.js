import React from "react"
import CrumbLayout from "../components/crumblayout"
// import NYCBgSection from "../components/images/nycbg"
import Container from "../components/container"
import Column from "../components/column"
import { graphql } from "gatsby"
import BlueIndexLink from "../components/links/blueindexlink"
import TextIndexLink from "../components/links/textindexlink"
import WhiteIndexLink from "../components/links/whiteindexlink"
import SiteSearch from "../components/search/sitesearch"
import WhiteLink from "../components/links/whitelink"
import CUMCImage from "../components/images/cumc"
import Benchwork from "../components/images/benchwork"
import PublicationList from "../components/publication/publicationlist"
import Button from "../components/button"
import useSiteMetadata from "../hooks/sitemetadata"
import DropShadowFrame from "../components/images/dropshadowframe"
import Img from "gatsby-image"
import useImageMap from "../hooks/imagemap"
import ShareLinks from "../components/share/sharelinks"
import CalEvent from "../components/calendar/calevent"

const HomeSection = ({ title, subTitle, text, links, alt }) => {
  return (
    <div className={`text-center p-16 ${alt ? "blue-bg text-white" : ""}`}>
      <span
        className={`uppercase tracking-wide border-t-2 p-2 mx-auto ${
          alt ? "border-white" : "blue-border"
        }`}
      >
        {title}
      </span>
      <h2 className="mt-4">{subTitle}</h2>
      <p>{text}</p>

      {links.map((link, index) => (
        <div className="mt-2" key={index}>
          {alt ? (
            <WhiteIndexLink to={link.url}>{link.text}</WhiteIndexLink>
          ) : (
            <BlueIndexLink to={link.url}>{link.text}</BlueIndexLink>
          )}
        </div>
      ))}
    </div>
  )
}

HomeSection.defaultProps = {
  alt: false,
}

const HomeDiv = ({ children, className }) => (
  <div className={`py-32 ${className}`}>
    <Container>{children}</Container>
  </div>
)

HomeDiv.defaultProps = {
  className: "",
}

const HomeTitle = ({ children, className }) => (
  <div className={`text-4xl font-bold mb-4 ${className}`}>{children}</div>
)

HomeTitle.defaultProps = {
  className: "",
}

// const CalEvent = ({ key, calEvent, imageMap }) => (
//   <Column
//     className="mb-6 bg-white shadow-md hover:shadow-lg overflow-hidden rounded-md trans-ani"
//     key={key}
//   >
//     <Column className="w-2/10 md:w-1/10 m-4">
//       <CalEventDate event={calEvent} />
//     </Column>

//     <Column className="w-8/10 md:w-9/10">
//       <FullDiv>
//         <CalEventDetails event={calEvent} imageMap={imageMap} />
//       </FullDiv>
//     </Column>
//   </Column>
// )

const IndexTemplate = ({ path, pageContext, data }) => {
  const {
    director,
    allCalEvents,
    nEvents,
    allPublications,
    nPublications,
  } = pageContext

  const { paths } = useSiteMetadata()

  const imageMap = useImageMap(data)

  const now = new Date()

  const calEvents = []
  for (let i = 0; i < allCalEvents.length; ++i) {
    const calEvent = allCalEvents[i]

    if (calEvent.start === undefined) {
      calEvent.start = new Date(calEvent.frontmatter.start)
      calEvent.end = new Date(calEvent.frontmatter.end)
    }

    if (calEvent.start >= now) {
      calEvents.push(<CalEvent key={i} event={calEvent} imageMap={imageMap} />)
    }

    if (calEvents.length === nEvents) {
      break
    }
  }

  const publications = []
  for (let publication of allPublications) {
    publications.push(publication)

    if (publications.length === nPublications) {
      break
    }
  }

  // calEvents = allCalEvents.filter(e => {
  //   return e.start >= now
  // })

  return (
    <CrumbLayout
      floatMode="header"
      headerContent={<SiteSearch />}
      crumbContent={<ShareLinks path={path} />}
    >
      <CUMCImage />
      {/* <Container className="h-full py-8 sm:py-8">
        <Column className="h-full p-8 sm:p-16">
          <Column
            w="8"
            className="bg-columbia-blue opacity-75 float-left text-white p-8"
          >
            <div>
              <H2 className="text-white">Mission</H2>

              <p>
                The Institute for Cancer Genetics was founded in 1999 as part of
                a commitment by Columbia University to examine the molecular
                mechanisms and pathogenesis of cancer.
              </p>

              <WhiteIndexLink to="/about">More</WhiteIndexLink>
            </div>
          </Column>
        </Column>
      </Container> */}

      <HomeDiv className="bg-blue-600 text-white">
        <Column>
          <Column w={6} className="items-center justify-center">
            <div className="mb-8">
              <DropShadowFrame className="w-48 h-48 rounded">
                <Img
                  fluid={data.file.childImageSharp.fluid}
                  className="w-full hfull"
                />
              </DropShadowFrame>
              <div className="font-semibold mt-4">
                <WhiteLink
                  to={`${paths.facultyPath}/${director.frontmatter.id}`}
                >
                  {director.frontmatter.name},{" "}
                  {director.frontmatter.postNominalLetters}
                </WhiteLink>
              </div>
              <div>Director</div>
            </div>
          </Column>
          <Column w={6}>
            <div>
              <HomeTitle>Our Mission</HomeTitle>
              <div className="text-xl">
                <p>
                  The Institute for Cancer Genetics was founded in 1999 as part
                  of a commitment by Columbia University to examine the
                  molecular mechanisms and pathogenesis of cancer.
                </p>
                <p className="mt-4">
                  Researchers use traditional approaches such as transgenic mice
                  to model human cancers and also take advantage of new
                  technology such as next generation sequencing to identify and
                  characterize key proteins and transcriptional and signaling
                  pathways involved in tumor initiation and progression.
                </p>
                <p className="mt-4">
                  Research in the ICG includes cancer genetics and epigenetics,
                  intensive analysis of key protein-protein interactions in
                  oncogenic pathways, DNA damage and repair in normal and
                  neoplastic cells, and experimental anti-cancer therapeutics.
                </p>
              </div>
            </div>
          </Column>
        </Column>
      </HomeDiv>

      {/* <HomeSection
      title="Expertise"
      subTitle="Find Out Who We Are"
      text="Explore what our world-class researchers are studying."
      links={[{ text: "Labs", url: "/research-areas/labs" }]}
    /> */}

      <Benchwork>
        <Container className="py-32">
          <Column className="py-8">
            <Column w={6}>
              <div>
                <HomeTitle>Meet The Faculty</HomeTitle>
                <p className="text-xl">
                  Find out who we are by exploring what our world-class
                  researchers are studying.
                </p>
                <h3 className="mt-4">
                  <TextIndexLink to={paths.facultyPath}>See more</TextIndexLink>
                </h3>
              </div>
            </Column>
            <Column w={6}></Column>
          </Column>
        </Container>
      </Benchwork>

      {/* <HomeSection
      title="News & Events"
      subTitle="Discover What's Happening Now"
      text="Follow our latest cancer news, viewpoints, and research."
      links={[
        { text: "News", url: "/news" },
        { text: "See upcoming events", url: "/events" },
      ]}
      alt={true}
    /> */}

      <div className="bg-columbia-light-gray">
        <Container className="py-32">
          <HomeTitle className="text-center">Upcoming Events</HomeTitle>
          <Container>
            <div className="mt-8">{calEvents}</div>

            <div className="mt-8">
              <h3>
                <BlueIndexLink to={paths.eventsPath}>
                  See all events
                </BlueIndexLink>
              </h3>
            </div>
          </Container>
        </Container>
      </div>

      {/* <HomeSection
        title="Publications"
        subTitle="Read About Our Pioneering Work"
        text="Our research is published in world renowed journals."
        links={[{ text: "Publications", url: "/research-areas/publications" }]}
      /> */}

      <HomeDiv>
        <HomeTitle className="text-center">Recent Publications</HomeTitle>
        {/* <p>Read about our pioneering research in world renowed journals.</p> */}
        <PublicationList publications={publications} />
        {/* <BlueIndexLink to="/research-areas/publications">
          All Publications
        </BlueIndexLink> */}
        <div className="text-center mt-16">
          <Button to={paths.publicationsPath}>All Publications</Button>
        </div>
      </HomeDiv>
    </CrumbLayout>
  )
}

export default IndexTemplate

export const query = graphql`
  query {
    file(
      absolutePath: { regex: "/images/people/" }
      name: { eq: "riccardo-dalla-favera" }
    ) {
      relativePath
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    files: allFile(
      filter: {
        absolutePath: { regex: "/images/people/" }
        ext: { regex: "/jpg/" }
      }
    ) {
      edges {
        node {
          name
          ext
          relativePath
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
