import React from "react"
import Layout from "../components/layout"

const About = () => (
  <Layout
    crumbs={[
      ["Home", "/"],
      ["About", "/about"],
    ]}
    title="About Us"
  >
    <p>Institute for Cancer Genetics website</p>
    <p>Version: 2020.02.22</p>
    <p>
      Designed and developed by{" "}
      <a href="mailto:antony.b.holmes@gmail.com">Antony Holmes</a>
    </p>
  </Layout>
)

export default About
