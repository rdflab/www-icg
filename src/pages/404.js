import React from "react"

import CrumbLayout from "../components/crumblayout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <CrumbLayout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </CrumbLayout>
)

export default NotFoundPage
