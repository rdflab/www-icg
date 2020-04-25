import React from "react"
import { Link } from "gatsby"

import CrumbLayout from "../components/crumblayout"
import SEO from "../components/seo"

const Help = () => (
  <CrumbLayout crumbs={[["Help", "/help"]]}>
    <SEO title="Help" />
    <p>Institute for Cancer Genetics website</p>
    <p>version: 1.0.0</p>
    <p>Developed by Antony Holmes</p>
    <Link to="/">Go back to the homepage</Link>
  </CrumbLayout>
)

export default Help
