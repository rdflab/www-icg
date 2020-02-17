import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Contact = () => (
  <Layout>
    <SEO title="Contact" />
    <p>Institute for Cancer Genetics website</p>
    <p>version: 1.0.0</p>
    <p>Developed by Antony Holmes</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Contact