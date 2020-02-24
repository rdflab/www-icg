import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Title from "../components/title"

const IndexPage = () => (
  <Layout crumbs={[["Home", "/"]]}>
    <SEO title="Home" />

    <Title>Overview</Title>

    <p>
      The Institute for Cancer Genetics was founded in 1999 as part of a
      commitment by Columbia University to examine the molecular mechanisms and
      pathogenesis of cancer. Researchers in the Institute use traditional
      approaches such as transgenic mice to model human cancers and also take
      advantage of new technology such as Nextgen sequencing to identify and
      characterize key proteins and transcriptional and signaling pathways
      involved in tumor initiation and progression. Research in the ICG includes
      cancer genetics and epigenetics, intensive analysis of key protein-protein
      interactions in oncogenic pathways, DNA damage and repair in normal and
      neoplastic cells, and experimental anti-cancer therapeutics.
    </p>
  </Layout>
)

export default IndexPage
