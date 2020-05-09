import React from "react"
import H1 from "../components/headings/h1"
import Container from "../components/container"
import CrumbLayout from "../components/crumblayout"

const About = () => (
  <CrumbLayout crumbs={[["About", "/about"]]} title="About Us">
    <Container className="py-16">
      <H1>Mission</H1>
      <div>
        <p>
          The Institute for Cancer Genetics was founded in 1999 as part of a
          commitment by Columbia University to examine the molecular mechanisms
          and pathogenesis of cancer.
        </p>
        <p className="mt-4">
          Researchers use traditional approaches such as transgenic mice to
          model human cancers and also take advantage of new technology such as
          next generation sequencing to identify and characterize key proteins
          and transcriptional and signaling pathways involved in tumor
          initiation and progression.
        </p>
        <p className="mt-4">
          Research in the ICG includes cancer genetics and epigenetics,
          intensive analysis of key protein-protein interactions in oncogenic
          pathways, DNA damage and repair in normal and neoplastic cells, and
          experimental anti-cancer therapeutics.
        </p>
      </div>
    </Container>

    <div className="bg-blue-600 py-16 text-white">
      <Container>
        <H1 className="text-center">Contact Information</H1>

        <div className="text-center">
          <div>Herbert Irving Cancer Center</div>
          <div>1130 St Nicholas Ave</div>
          <div>New York, NY 10032</div>
          <div>USA</div>
        </div>
      </Container>
    </div>

    <Container className="py-16">
      <div className="w-full my-16 shadow-md bg-white overflow-hidden">
        <div className="iframe-container w-full" style={{ minHeight: "42rem" }}>
          <iframe
            align="center"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.4630742859304!2d-73.94173524903421!3d40.839755837625155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f69cf9446ff1%3A0x523dcfdc4ca47584!2s1130%20St%20Nicholas%20Ave%2C%20New%20York%2C%20NY%2010032!5e0!3m2!1sen!2sus!4v1583356250505!5m2!1sen!2sus"
            frameborder="0"
            allowfullscreen=""
            title="Small map"
          ></iframe>
        </div>
      </div>
    </Container>
  </CrumbLayout>
)

export default About
