import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout crumbs={[["Home", "/"]]}>
    <SEO title="Home" />
  </Layout>
)

export default IndexPage
