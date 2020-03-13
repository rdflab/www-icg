import React from "react"
import Layout from "../components/layout"
import NYCBgSection from "../components/images/nycbg"
import Container from "../components/container"
import Column from "../components/column"

import BlueIndexLink from "../components/blueindexlink"
import WhiteIndexLink from "../components/whiteindexlink"
import MicroscopeSection from "../components/images/microscope"
import TestTubesSection from "../components/images/testtubes"
import SiteSearch from "../components/search/sitesearch"
import HideSmall from "../components/hidesmall"

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
        <div className="mt-2">
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

const IndexPage = () => (
  <Layout
    crumbs={[["Home", "/"]]}
    title="Home"
    headerComponent={<SiteSearch />}
  >
    <TestTubesSection>
      <Container className="h-full py-8 sm:py-16">
        <Column className="h-full p-8 sm:p-16">
          <Column
            w="7"
            className="bg-blue-columbia opacity-75 float-left text-white p-8"
          >
            <h2 className="title is-2 text-white">
              Institute For Cancer Genetics
            </h2>

            <p>
              The Institute for Cancer Genetics was founded in 1999 as part of a
              commitment by Columbia University to examine the molecular
              mechanisms and pathogenesis of cancer.
            </p>

            <WhiteIndexLink to="/about">More</WhiteIndexLink>
          </Column>
        </Column>
      </Container>
    </TestTubesSection>

    <HomeSection
      title="Expertise"
      subTitle="Find Out Who We Are"
      text="Our world-class researchers study all aspects of cancer. Explore what
        they are doing."
      links={[{ text: "Labs", url: "/research-area/labs" }]}
    />

    <HomeSection
      title="News & Events"
      subTitle="Discover What's Happening Now"
      text="Follow our latest cancer news, viewpoints, and research."
      links={[
        { text: "News", url: "/news" },
        { text: "See upcoming events", url: "/events" },
      ]}
      alt={true}
    />

    <HomeSection
      title="Publications"
      subTitle="Read About Our Pioneering Work"
      text="Our research is published in world renowed journals with high impact
      factors."
      links={[{ text: "Publications", url: "/research-areas/publications" }]}
    />
  </Layout>
)

export default IndexPage
