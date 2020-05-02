import React from "react"
import Layout from "../components/layout"
// import NYCBgSection from "../components/images/nycbg"
import Container from "../components/container"
import Column from "../components/column"

import BlueIndexLink from "../components/blueindexlink"
import WhiteIndexLink from "../components/whiteindexlink"
// import MicroscopeSection from "../components/images/microscope"
import TestTubesSection from "../components/images/testtubes"
import SiteSearch from "../components/search/sitesearch"
import H2 from "../components/headings/h2"
import generic from "../assets/svg/generic.svg"
import WhiteLink from "../components/whitelink"
import CalEventDate from "../components/calendar/caleventdate"
import CalEventDetails from "../components/calendar/caleventdetails"
import BlueLink from "../components/bluelink"
import ICGBD from "../components/images/icgbd"
import Benchwork from "../components/images/benchwork"
import PublicationList from "../components/publication/publicationlist"

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
  <div className={`py-8 ${className}`}>
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

const IndexTemplate = ({ pageContext }) => {
  const {
    director,
    allCalEvents,
    nEvents,
    allPublications,
    nPublications,
  } = pageContext

  const now = Date.now()

  const calEvents = []
  for (let calEvent of allCalEvents) {
    if (calEvent.start === undefined) {
      calEvent.start = new Date(calEvent.frontmatter.start)
      calEvent.end = new Date(calEvent.frontmatter.end)
    }

    if (calEvent.start >= now) {
      calEvents.push(
        <Column>
          <Column className="w-2/10 mr-4">
            <CalEventDate event={calEvent} />
          </Column>
          <Column>
            <CalEventDetails event={calEvent} />
          </Column>
        </Column>
      )
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
    <Layout title="Home" headerComponent={<SiteSearch />}>
      <ICGBD>
        {/* <Container className="h-full py-8 sm:py-8">
        <Column className="h-full p-8 sm:p-16">
          <Column
            w="8"
            className="bg-blue-columbia opacity-75 float-left text-white p-8"
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
      </ICGBD>

      <HomeDiv className="bg-blue-600 text-white">
        <Column>
          <Column w={6} className="items-center justify-center">
            <div className="w-1/3 mb-8">
              <div className="bg-white shadow-md rounded">
                <img src={generic} className="w-full" />
              </div>
              <div className="font-semibold mt-4">
                <WhiteLink
                  to={`/research-areas/labs/${director.frontmatter.id}`}
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
              <HomeTitle>Discovery</HomeTitle>
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
                <HomeTitle>Expertise</HomeTitle>
                <p className="text-xl">
                  Find out who we are by exploring what our world-class
                  researchers are studying.
                </p>
                <BlueIndexLink to="/people/faculty">Faculty</BlueIndexLink>
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

      <Column>
        <Column w={7}>
          <div className="w-full p-8 pl-48">{calEvents}</div>
        </Column>
        <Column w={5} className="ml-8 bg-blue-800 text-white">
          <div className="p-8">
            <HomeTitle>Upcoming Events</HomeTitle>
            <p>See upcoming events and seminars of interest.</p>
            <WhiteIndexLink to="/events">See all events</WhiteIndexLink>
          </div>
        </Column>
      </Column>

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
        <BlueIndexLink to="/research-areas/publications">
          All Publications
        </BlueIndexLink>
      </HomeDiv>
    </Layout>
  )
}

export default IndexTemplate
