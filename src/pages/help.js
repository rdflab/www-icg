import React from "react"
import { Link } from "gatsby"

import CrumbContainerLayout from "../components/crumbcontainerlayout"
import SEO from "../components/seo"

const Help = () => (
  <CrumbContainerLayout crumbs={[["Help", "/help"]]}>
    <SEO title="Help" />
    <p>Institute for Cancer Genetics website</p>
    <p>Version: 2020.05.01</p>
    <p>Developed by Antony Holmes</p>
  </CrumbContainerLayout>
)

export default Help
