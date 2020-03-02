import React from "react"
import Layout from "../components/layout"
import NYCBgSection from "../components/nycbg"
import Container from "../components/container"
import Columns from "../components/columns"
import Column from "../components/column"
import BlueIndexLink from "../components/blueindexlink"
import WhiteIndexLink from "../components/whiteindexlink"

const IndexPage = () => (
  <Layout crumbs={[["Home", "/"]]} title="Home">
    <NYCBgSection>
      <Container className="h-full">
        <Columns className="h-full py-16">
          <Column
            w="7/12"
            className="bg-blue-700 opacity-75 float-left text-white p-8"
          >
            <h2>Institute For Cancer Genetics</h2>

            <p>
              The Institute for Cancer Genetics was founded in 1999 as part of a
              commitment by Columbia University to examine the molecular
              mechanisms and pathogenesis of cancer.
            </p>

            <WhiteIndexLink to="/about">More</WhiteIndexLink>
          </Column>
        </Columns>
      </Container>
    </NYCBgSection>

    <div class="text-center p-16">
      <span className="uppercase tracking-wide border-t-2 border-blue-500 p-2 mx-auto">
        Expertise
      </span>
      <h2 className="mt-4">Find Out Who We Are</h2>
      <p>
        Our world-class researchers study all aspects of cancer. Explore what
        they are doing.
      </p>
      <BlueIndexLink to="/research-area/labs">Labs</BlueIndexLink>
    </div>

    <div class="text-center p-16 blue-bg text-white">
      <span className="uppercase tracking-wide border-t-2 border-white p-2 mx-auto">
        News & Events
      </span>
      <h2 className="mt-4">Discover What's Happening Now</h2>
      <p>Follow our latest cancer news, viewpoints, and research.</p>
      <div>
        <WhiteIndexLink to="/news">News</WhiteIndexLink>
      </div>
      <div>
        <WhiteIndexLink to="/events">See upcoming events</WhiteIndexLink>
      </div>
    </div>

    <div class="text-center p-16">
      <span className="uppercase tracking-wide border-t-2 border-blue-500 p-2 mx-auto">
        Publications
      </span>
      <h2 className="mt-4">Read About Our Pioneering Work</h2>
      <p>
        Our research is published in world renowed journals with high impact
        factors.
      </p>
      <BlueIndexLink to="/research-areas/publications">
        Publications
      </BlueIndexLink>
    </div>
  </Layout>
)

export default IndexPage
