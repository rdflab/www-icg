import React from "react"
import CrumbContainerLayout from "../components/crumbcontainerlayout"
import SiteSearch from "../components/search/sitesearch"
import H1 from "../components/headings/h1"

const Services = () => (
  <CrumbContainerLayout
    crumbs={[["Services", "/services"]]}
    title="Services"
    headerComponent={<SiteSearch />}
  >
    <H1 className="text-center">Services</H1>
  </CrumbContainerLayout>
)

export default Services
