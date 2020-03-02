import React from "react"
import CrumbLayout from "../components/crumblayout"

const About = () => (
  <CrumbLayout
    crumbs={[
      ["Home", "/"],
      ["About", "/about"],
    ]}
    title="About Us"
  >
    <p>
      The Institute for Cancer Genetics was founded in 1999 as part of a
      commitment by Columbia University to examine the molecular mechanisms and
      pathogenesis of cancer.
    </p>
    <p>
      Researchers use traditional approaches such as transgenic mice to model
      human cancers and also take advantage of new technology such as next
      generation sequencing to identify and characterize key proteins and
      transcriptional and signaling pathways involved in tumor initiation and
      progression.
    </p>
    <p>
      Research in the ICG includes cancer genetics and epigenetics, intensive
      analysis of key protein-protein interactions in oncogenic pathways, DNA
      damage and repair in normal and neoplastic cells, and experimental
      anti-cancer therapeutics.
    </p>
  </CrumbLayout>
)

export default About
